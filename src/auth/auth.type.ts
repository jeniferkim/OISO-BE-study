// JWT 안에 넣을 정보
export interface JwtPayload {
  sub: number;
  email: string;
}

// 로그인 API 응답
export interface LoginResponse {
  accessToken: string;
}

// Guard가 검증 후, 컨트롤러에서 사용할 현재 사용자 정보
export interface AuthUser {
  userId: number;
  email: string;
}

// 인증 타입 공통화
// Guard를 통과한 Controller에서 사용
export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
