import axios from 'axios';
// import { environment } from '../config/environment';
import { apiUrl } from '../config/environment';

// Axios 인스턴스 생성
const authInstance = axios.create({
  baseURL: `${apiUrl}/api/auth`,
  withCredentials: true, // 쿠키 포함 요청
  timeout: 10000,
});

// 요청 인터셉터 - 쿠키 자동 포함
authInstance.interceptors.request.use(
  (config) => {
    // withCredentials: true로 설정되어 있어 쿠키가 자동으로 포함됨
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 세션 만료 처리
authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // HashRouter 환경에서는 hash 기반으로 라우팅되므로
      // 이미 로그인 화면이 아니라면 hash만 업데이트하여 무한 새로고침을 방지한다.
      const loginHash = '#/login';
      if (window.location.hash !== loginHash) {
        window.location.hash = loginHash;
      }
    }
    return Promise.reject(error);
  }
);

// 인증 관련 API 함수들
export const authApi = {
  // 회원가입
  register: (name, email, password) => 
    authInstance.post('/register', { name, email, password }),

  // 로그인
  login: (email, password) => 
    authInstance.post('/login', { email, password }),

  // 로그아웃
  logout: () => 
    authInstance.post('/logout'),

  // 현재 사용자 정보 조회
  getCurrentUser: () => 
    authInstance.get('/me'),

  // OAuth 설정 정보 조회
  getAuthConfig: () =>
    authInstance.get('/config'),

  // OAuth 콜백 처리
  handleOAuthCallback: (provider, code) => 
    authInstance.post(`/${provider}/callback`, { code }),

  // 관리자 전용 API
  admin: {
    // 모든 사용자 목록 조회
    getUsers: () => 
      authInstance.get('/admin/users'),
    
    // 사용자 권한 변경
    updateUserType: (userId, userType) => 
      authInstance.put(`/admin/users/${userId}`, { userType }),
    
    // 사용자 삭제
    deleteUser: (userId) => 
      authInstance.delete(`/admin/users/${userId}`)
  }
};

export default authApi;
