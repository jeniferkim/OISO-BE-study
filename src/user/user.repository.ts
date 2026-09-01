import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 로그인 요청의 이메일에 해당하는 사용자 조회
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // 토큰의 사용자 ID로 실제 사용자 조회
  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // User + SavedRoute 조회
  findWithSavedRoutes(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        savedRoutes: {
          orderBy: {
            savedAt: 'desc', // 관계 데이터에도 정렬 가능
          },
        },
      },
    });
  }
}
