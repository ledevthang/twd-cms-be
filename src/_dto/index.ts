import { ApiProperty } from '@nestjs/swagger';
import { IsInterger } from '_validators/common.validators';
import { Max, Min } from 'class-validator';

export class PaginatedQuery {
  @ApiProperty({ example: 1 })
  @IsInterger
  @Min(1)
  page: number;

  @ApiProperty({ example: 10 })
  @Max(100)
  @IsInterger
  limit: number;
}

export * from './user.dto';
export * from './auth.dto';
