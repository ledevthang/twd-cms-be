import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Claims, Role } from 'types/auth.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Role>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const user: Claims = request.user;

    switch (role) {
      case Role.admin:
        return user.role == Role.admin || user.role == Role.root;

      case Role.root:
        return user.role == Role.root;

      default:
        return false;
    }
  }
}
