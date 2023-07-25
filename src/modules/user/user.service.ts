import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';
import { CreateUser, GetUsersQuery } from '_dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ password, role, username }: CreateUser) {
    const hashedPassword = await bcrypt.hash(password, 8);

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        role,
        username
      }
    });
  }

  async getUsers({ limit, page }: GetUsersQuery) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          username: true,
          role: true
        }
      }),
      this.prisma.user.count()
    ]);

    return {
      data: users,
      total,
      limit,
      page
    };
  }
}
