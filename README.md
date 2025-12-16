# PWD Week 6 – Ajou Campus Foodmap (Client)

아주대 캠퍼스 주변 맛집을 모아 보여주는 React(Vite) 싱글 페이지 앱입니다. 목록/상세/인기/제보 흐름과 함께 세션 기반 인증, 관리자 관리, 제출 승인 플로우를 연습합니다.

## 주요 기능
- 홈: 핵심 섹션 링크 카드로 빠른 진입.
- 맛집 목록(`/_#/list`): React Query로 `/api/restaurants` 호출, 카테고리 필터, 로딩/에러 상태 표시.
- 상세(`/_#/restaurant/:id`): 위치·가격·평점·추천메뉴 표시, 이미지 플레이스홀더 처리.
- 인기 TOP(`/_#/popular`): `/api/restaurants/popular` 결과를 순위/트로피 뱃지로 노출.
- 맛집 제보(`/_#/submit`): react-hook-form 검증, Toast 알림, `/api/submissions` 제출.
- 인증/대시보드: 로그인·회원가입(이메일 기반, OAuth 설정 값 반영), 세션 자동 복구, 대시보드/로그아웃, 보호 라우트(`ProtectedRoute`, `AdminRoute`).
- 관리자: 레스토랑 CRUD, 제보 승인→레스토랑 등록/상태 변경, 사용자 목록에서 권한 변경.

## 기술 스택
- React 19, React Router 7(해시 라우터), Vite + SWC
- 상태/데이터: @tanstack/react-query, React Context(Auth), react-hook-form
- API 통신: axios(withCredentials), 환경별 `apiUrl` 자동 선택
- 스타일/UX: Emotion styled, React Icons, React Toastify, react-spinners

## 실행 방법
```bash
npm install
npm run dev       # http://localhost:5173, 해시 라우팅
```

## 환경변수(.env.local 예시)
```bash
VITE_API_URL=http://localhost:5000      # 백엔드 베이스 URL
VITE_CLIENT_URL=http://localhost:5173   # 클라이언트 URL (쿠키/CORS용)
```
- 미설정 시 기본값: `https://pwd-week6-server.onrender.com`, `https://pwd-week6-client.vercel.app`.
- 인증 요청은 `withCredentials: true`로 쿠키를 포함하므로, 백엔드 CORS 설정에 클라이언트 URL을 허용해야 합니다.

## npm 스크립트
- `npm run dev` : 개발 서버
- `npm run build` : 프로덕션 번들
- `npm run preview` : 빌드 결과 로컬 확인
- `npm run lint` : ESLint 검사
- `npm run deploy` : gh-pages 배포(dist 사용)
- `npm run deploy:vercel` : Vercel 프로덕션 배포(서버리스 리라이트는 `vercel.json` 참고)

## 구조 메모
- `src/App.jsx` : 해시 라우터, 페이지 라우팅/전역 Provider, Toast 컨테이너
- `src/contexts/AuthContext.jsx` : 세션 복구, 로그인/로그아웃/회원가입, 관리자 판별
- `src/services/api.jsx` : 레스토랑/제보 API 클라이언트
- `src/services/authApi.js` : 인증/사용자 관리 API 클라이언트
- `src/pages/*.jsx` : Home, List, Detail, Popular, Submit, Dashboard, Admin, Submissions 등 라우트별 페이지
- `src/components/ProtectedRoute.jsx`, `src/components/AdminRoute.jsx` : 로그인/관리자 보호 라우트
- `src/utils/connectionTest.js` : 앱 시작 시 백엔드 헬스 체크

## 배포/라우팅 노트
- 해시 라우터(HashRouter)를 사용하여 정적 호스팅(gh-pages, Vercel)에서도 클라이언트 라우팅이 깨지지 않습니다.
- Vercel 사용 시 `vercel.json`의 rewrite(`/index.html`)가 포함되어 있습니다.
