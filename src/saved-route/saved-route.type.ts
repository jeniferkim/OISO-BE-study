/**
 * 목표: GET /saved-routes
 * {
  "savedRoutes": [
    {
      "id": 1,
      "title": "부산 원도심 루트",
      "savingAmount": 5000,
      "savedAt": "2026-07-25T08:00:00.000Z"
    }
  ],
  "totalSavingAmount": 5000
}
 */

// 타입 작성
export interface SavedRoute {
  // 저장 루트 한 개의 형태
  id: number;
  title: string;
  savingAmount: number;
  savedAt: string;
}

export interface SavedRouteListResponse {
  // API 전체 응답의 형태
  savedRoutes: SavedRoute[];
  totalSavingAmount: number;
}

// 삭제된 전체 객체 대신 메시지만 반환
export interface DeleteSavedRouteResponse {
  message: string;
}
