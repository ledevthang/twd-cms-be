import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '_guards/jwt.guard';
import { RolesGuard } from '_guards/roles.guard';
import { Role } from 'types/auth.type';

export function Auth(
  role: Role,
  /* eslint-disable-next-line */
  ...AnyGuardElse: Array<Function | CanActivate>
) {
  console.log(role);

  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard, ...AnyGuardElse),
    ApiBearerAuth()
  );
}
