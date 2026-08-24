import { ApiProperty } from '@nestjs/swagger';

export class SavedRouteResponseDto {
  @ApiProperty({
    example: 1,
  })
  id!: number;

  @ApiProperty({
    example: '부산 원도심 루트',
  })
  title!: string;

  @ApiProperty({
    example: 5000,
  })
  savingAmount!: number;

  @ApiProperty({
    example: '2026-08-04T12:00:00.000Z',
  })
  savedAt!: string;
}
