import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'modules/auth/auth.service';
import { Strategy } from 'passport-local';
import { Claims } from 'types/auth.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<Claims> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
