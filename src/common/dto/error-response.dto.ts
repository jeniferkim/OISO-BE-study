import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode!: number;

  @ApiProperty({
    example: '저장 루트를 찾을 수 없습니다.',
  })
  message!: string | string[];

  @ApiProperty({
    example: '/saved-routes/999',
  })
  path!: string;

  @ApiProperty({
    example: '2026-08-25T12:00:00.000Z',
  })
  timestamp!: string;
}
