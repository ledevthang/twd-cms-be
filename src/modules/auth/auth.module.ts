import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '_strategies/local.strategy';
import { JwtRefreshStrategy } from '_strategies/jwtRefresh.strategy';
import { JwtStrategy } from '_strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, JwtStrategy]
})
export class AuthModule {}
