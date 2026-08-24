// DTO: 프론트가 보내는 요청 본문의 형식을 정의

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSavedRouteDto {
  @ApiProperty({
    example: '부산 원도심 루트',
    description: '저장할 루트 이름',
  })
  @IsString() // 문자열이어야함
  @IsNotEmpty() // 빈 문자열이면 안 됨
  title!: string;

  @ApiProperty({
    example: 5000,
    description: '루트를 통해 절약한 금액',
    minimum: 0,
  })
  @IsInt() // 정수여야 함
  @Min(0) // 0 이상이어야 함
  savingAmount!: number;

  // DTO는 클라이언트가 보내야 하는 값만 정의함
  // @IsInt()
  // @Min(1)
  // userId!: number;
}

// ! 는 이 필드는 지금 초기화 코드는 안 보이지만, 실제 사용 시점에는 값이 들어온다고 TS에 알려주는 표시
