import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { email, password, name } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword, name });
    await user.save();

    return { message: 'User registered successfully' };
  }
  async signIn(
    SignInDto: SignInDto,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { email, password } = SignInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user._id.toString(), user.email, user.name, res);
  }
  private async generateTokens(
    userId: string,
    email: string,
    name: string,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const accessToken = this.jwtService.sign(
      { _id: userId, email, name },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_SECRET, expiresIn: '7d' },
    );

    await this.updateRefreshToken(userId, refreshToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'strict',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'strict',
      path: '/auth/refresh',
    });
    return res.json({ message: 'Login successful' });
  }
  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedToken,
    });
  }
  async refreshToken(
    refreshToken: string,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('missing refresh token');
      }
      const decodedToken = this.jwtService.verify<{ sub: string }>(
        refreshToken,
        {
          secret: process.env.JWT_SECRET,
        },
      );
      const userId = decodedToken.sub;
      const user = await this.userModel.findById(userId);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(
        user._id.toString(),
        user.email,
        user.name,
        res,
      );
    } catch (e: any) {
      return res.status(401).json({ message: `${e}` });
    }
  }

  logOut(res: Response): Response<any, Record<string, any>> {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'strict',
      path: '/',
    });

    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'strict',
      path: '/auth/refresh',
    });
    return res.json({ message: 'logout successful' });
  }
}
