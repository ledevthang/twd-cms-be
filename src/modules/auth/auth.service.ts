import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Claims, Role } from 'types/auth.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(claims: Claims) {
    const [tokens, user] = await Promise.all([
      this.generateTokens(claims),
      this.prisma.user.findUnique({
        where: { id: claims.id },
        select: {
          id: true,
          role: true,
          username: true
        }
      })
    ]);
    return {
      ...tokens,
      user
    };
  }

  async validateUser(username: string, password: string): Promise<Claims> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      },
      select: { id: true, role: true, username: true, password: true }
    });
    if (!user) throw new UnauthorizedException('Username is not exist!');

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new UnauthorizedException('Password is incorrect!');

    return {
      id: user.id,
      role: user.role as Role,
      username: user.username
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        refreshToken: true,
        id: true,
        role: true,
        username: true
      }
    });
    if (refreshToken !== user.refreshToken) throw new UnauthorizedException();

    const payload: Claims = {
      id: user.id,
      role: user.role as Role,
      username: user.username
    };

    const tokens = await this.generateTokens(payload);

    return tokens;
  }

  private async generateTokens(claims: Claims) {
    const accessToken = this.jwtService.sign(claims, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET
    });

    const refreshToken = this.jwtService.sign(
      { sub: claims.id },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.REFRESH_TOKEN_SECRET
      }
    );

    await this.prisma.user.update({
      where: { id: claims.id },
      data: {
        refreshToken: refreshToken
      }
    });

    return {
      accessToken,
      refreshToken
    };
  }
}
