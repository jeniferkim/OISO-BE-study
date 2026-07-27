import { Controller, Get } from '@nestjs/common';

import { SavedRouteService } from './saved-route.service';
import type { SavedRouteListResponse } from './saved-route.type';

// URL이 만들어지는 방식
// 기본 경로를 만듦
@Controller('saved-routes')
export class SavedRouteController {
  constructor(private readonly savedRouteService: SavedRouteService) {}

  // Get 요청을 받게 함
  @Get()
  // --> GET /saved-routes
  findAll(): SavedRouteListResponse {
    // 계산 x. Service만 호출함
    return this.savedRouteService.findAll();
  }
}
