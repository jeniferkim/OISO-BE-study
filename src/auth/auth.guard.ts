import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import type { AuthUser, JwtPayload } from './auth.type';
import { ErrorCode } from 'src/common/errors/error-code';

interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

// 가드 내부에서는 인증 전까지 user가 없을 수 있음. 선택값 타입을 별도로
// Guard가 토큰을 검증하는 도중 사용
export interface RequestWithOptionalUser extends Request {
  user?: AuthUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        code: ErrorCode.AUTH_TOKEN_REQUIRED,
        message: '인증 토큰이 필요합니다.',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      request.user = {
        userId: payload.sub,
        email: payload.email,
      };
    } catch {
      throw new UnauthorizedException({
        code: ErrorCode.INVALID_ACCESS_TOKEN,
        message: '유효하지 않거나 만료된 토큰입니다.',
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
