import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CreateSavedRouteDto } from './dto/create-saved-route.dto';
import { SavedRouteService } from './saved-route.service';
import type {
  DeleteSavedRouteResponse,
  SavedRoute,
  SavedRouteListResponse,
} from './saved-route.type';

@Controller('saved-routes')
export class SavedRouteController {
  constructor(private readonly savedRouteService: SavedRouteService) {}

  @Get()
  findAll(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<SavedRouteListResponse> {
    return this.savedRouteService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SavedRoute> {
    return this.savedRouteService.findOne(id);
  }

  @Post()
  create(
    @Body() createSavedRouteDto: CreateSavedRouteDto,
  ): Promise<SavedRoute> {
    return this.savedRouteService.create(createSavedRouteDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteSavedRouteResponse> {
    return this.savedRouteService.remove(id);
  }
}
