import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<Users> {
    return this.prisma.users.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Partial<Users> | null> {
    return this.prisma.users.findUnique({
      where: { email },
      omit: {
        passwordHash: true,
        updatedAt: true,
      },
    });
  }

  async update(
    data: UpdateUserDto,
    id: string,
  ): Promise<Partial<Users> | null> {
    const user = await this.prisma.users.findFirst({
      where: { externalId: id },
    });

    if (!user) {
      return null;
    }

    return this.prisma.users.update({
      where: { id: user.id },
      data,
      omit: {
        passwordHash: true,
      },
    });
  }

  async delete(id: string): Promise<boolean | null> {
    const user = await this.prisma.users.findFirst({
      where: { externalId: id },
    });

    if (!user) {
      return null;
    }

    const result = await this.prisma.users.delete({
      where: { id: user.id },
    });

    return !!result;
  }
}
