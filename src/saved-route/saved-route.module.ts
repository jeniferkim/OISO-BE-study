import { Module } from '@nestjs/common';

import { PrismaModule } from 'prisma/prisma.module';
import { SavedRouteController } from './saved-route.controller';
import { SavedRouteRepository } from './saved-route.repository';
import { SavedRouteService } from './saved-route.service';

@Module({
  imports: [PrismaModule],
  // HTTP 요청을 받을 컨트롤러 등록
  // 컨트롤러에 서비스 주입
  controllers: [SavedRouteController],

  // NestJS가 생성하고 관리해야 할 객체를 등록
  // 서비스에 레포 주입
  providers: [SavedRouteService, SavedRouteRepository],
})
export class SavedRouteModule {}
