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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SavedRouteListResponseDto } from './dto/saved-route-list-response.dto';
import { SavedRouteResponseDto } from './dto/saved-route-response.dto';

@ApiTags('Saved Routes') // 스웨거에서 API를 그룹으로 묶음
@ApiBearerAuth() // 이 컨트롤러 API들이 Bearer JWT 인증을 사용한다는 걸 문서에 표시
// 컨트롤러 전체에 인증을 적용하려면 클래스 위에 붙임
@UseGuards(AuthGuard)
@Controller('saved-routes')
export class SavedRouteController {
  constructor(private readonly savedRouteService: SavedRouteService) {}

  @Get()
  @ApiOperation({
    summary: '내 저장 루트 목록 조회',
  })
  @ApiOkResponse({
    description: '저장 루트 조회 성공',
    type: SavedRouteListResponseDto,
  })
  findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<SavedRouteListResponse> {
    return this.savedRouteService.findAllByUserId(request.user.userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '저장 루트 상세 조회',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '저장 루트 ID',
    example: 1,
  })
  @ApiOkResponse({
    description: '저장 루트 상세 조회 성공',
    type: SavedRouteResponseDto,
  })
  findOne(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SavedRoute> {
    return this.savedRouteService.findOne(request.user.userId, id);
  }

  @Post()
  @ApiOperation({
    summary: '저장 루트 생성',
  })
  @ApiCreatedResponse({
    description: '저장 루트 생성 성공',
    type: SavedRouteResponseDto,
  })
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
  @ApiOperation({
    summary: '저장 루트 삭제',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '저장 루트 ID',
    example: 1,
  })
  @ApiUnauthorizedResponse({
    description: '인증 토큰이 없거나 유효하지 않음',
  })
  @ApiForbiddenResponse({
    description: '다른 사용자의 저장 루트',
  })
  @ApiNotFoundResponse({
    description: '저장 루트가 존재하지 않음',
  })
  remove(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteSavedRouteResponse> {
    return this.savedRouteService.remove(request.user.userId, id);
  }
}
