import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
