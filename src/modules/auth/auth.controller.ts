import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Claims } from 'types/auth.type';
import { User } from '_decorators/user.decorator';
import { LocalAuthGuard } from '_guards/local.auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from '_dto';
import { JwtRefreshAuthGuard } from '_guards/jwtRefresh.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  login(@User() claims: Claims) {
    return this.authService.login(claims);
  }

  @Post('refresh-token')
  @ApiBody({ type: RefreshTokenDto })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @User('id') userId: string,
    @Body('refreshToken') refreshToken: string
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
