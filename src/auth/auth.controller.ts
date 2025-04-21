import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
// @UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Post('reset-password')
  resetPassword(@Body() dto: AuthDto) {
    return this.authService.resetPassword(dto);
  }
  @Post('verify-email')
  verifyEmail(@Body() dto: AuthDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('delete-account')
  deleteAccount(@Body() dto: AuthDto) {
    return this.authService.deleteAccount(dto);
  }
  
  @Post('resend-verification-email')
  resendVerificationEmail(@Body() dto: AuthDto) {
    return this.authService.resendVerificationEmail(dto);
  }
}
