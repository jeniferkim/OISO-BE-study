import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user1@example.com',
    description: '로그인할 사용자의 이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
