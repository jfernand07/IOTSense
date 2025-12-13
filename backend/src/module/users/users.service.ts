import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findByEmail(email: string, includePassword = false) {
    if (includePassword) {
      return this.repo.findOne({ where: { email } });
    }
    return this.repo.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findById(id: number, includePassword = false) {
    const select: any = {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
    if (includePassword) {
      select.passwordHash = true;
    }
    return this.repo.findOne({
      where: { id },
      select,
    });
  }

  findByIdWithPassword(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateUserDto) {
    const existing = await this.findByEmail(dto.email);
    if (existing) throw new BadRequestException('El email ya está registrado.');

    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.password, 10),
      role: dto.role ?? UserRole.USER,
    });

    const saved = await this.repo.save(user);
    const { passwordHash: _, ...safe } = saved;
    return safe;
  }

  async findAll() {
    return this.repo.find({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
