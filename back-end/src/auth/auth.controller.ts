import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
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
  async signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(RefreshTokenDto);
  }
}
