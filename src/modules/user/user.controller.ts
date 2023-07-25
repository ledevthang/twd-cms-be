import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Auth } from '_decorators/auth.decorator';
import { CreateUser, GetUsersQuery } from '_dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userServeice: UserService) {}

  @Auth('root')
  @Post()
  createUSer(@Body() body: CreateUser) {
    return this.userServeice.create(body);
  }

  @Auth('root')
  @Get()
  getUsers(@Query() query: GetUsersQuery) {
    return this.userServeice.getUsers(query);
  }
}
