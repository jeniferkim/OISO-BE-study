import { ApiProperty } from '@nestjs/swagger';

import { SavedRouteResponseDto } from './saved-route-response.dto';

export class SavedRouteListResponseDto {
  @ApiProperty({
    type: [SavedRouteResponseDto],
  })
  savedRoutes!: SavedRouteResponseDto[];

  @ApiProperty({
    example: 8000,
  })
  totalSavingAmount!: number;
}
