import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateSavedRouteDto } from './dto/create-saved-route.dto';
import { SavedRouteService } from './saved-route.service';
import type {
  DeleteSavedRouteResponse,
  SavedRoute,
  SavedRouteListResponse,
} from './saved-route.type';

import type { AuthenticatedRequest } from '../auth/auth.type';
import { AuthGuard } from '../auth/auth.guard';

// 컨트롤러 전체에 인증을 적용하려면 클래스 위에 붙임
@UseGuards(AuthGuard)
@Controller('saved-routes')
export class SavedRouteController {
  constructor(private readonly savedRouteService: SavedRouteService) {}

  @Get()
  findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<SavedRouteListResponse> {
    return this.savedRouteService.findAllByUserId(request.user.userId);
  }

  @Get(':id')
  findOne(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SavedRoute> {
    return this.savedRouteService.findOne(request.user.userId, id);
  }

  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createSavedRouteDto: CreateSavedRouteDto,
  ): Promise<SavedRoute> {
    return this.savedRouteService.create(
      request.user.userId,
      createSavedRouteDto,
    );
  }

  @Delete(':id')
  remove(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteSavedRouteResponse> {
    return this.savedRouteService.remove(request.user.userId, id);
  }
}
