// DTO: 프론트가 보내는 요청 본문의 형식을 정의

import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSavedRouteDto {
  @IsString() // 문자열이어야함
  @IsNotEmpty() // 빈 문자열이면 안 됨
  title!: string;

  @IsInt() // 정수여야 함
  @Min(0) // 0 이상이어야 함
  savingAmount!: number;

  @IsInt()
  @Min(1)
  userId!: number;
}

// ! 는 이 필드는 지금 초기화 코드는 안 보이지만, 실제 사용 시점에는 값이 들어온다고 TS에 알려주는 표시
