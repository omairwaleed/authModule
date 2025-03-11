import { AuthService } from './auth.service';
import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request, Response } from 'express';
export interface RequestWithCookies extends Request {
  cookies: { refreshToken?: string; accessToken?: string };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Public()
  @Post('signin')
  async signIn(@Body() SignInDto: SignInDto, @Res() res: Response) {
    return this.authService.signIn(SignInDto, res);
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() req: RequestWithCookies,
    @Body() RefreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    return this.authService.refreshToken(
      req.cookies?.refreshToken as string,
      RefreshTokenDto,
      res,
    );
  }
}
