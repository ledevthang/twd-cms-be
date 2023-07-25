import { ApiProperty } from '@nestjs/swagger';
import { PaginatedQuery } from '_dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'types/auth.type';

export class CreateUser {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}

export class GetUsersQuery extends PaginatedQuery {}
