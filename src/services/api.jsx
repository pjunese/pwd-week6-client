import axios from 'axios';
import { environment } from '../config/environment';

// ✅ environment.js에 정의된 값 사용
const apiUrl = environment.API_URL;

// ✅ 끝에 '/'가 붙어 있으면 제거
const API_BASE_URL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

// 기본 axios 인스턴스 (인증 포함)
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키/세션 포함 요청
  timeout: 10000,
});

// 공개 조회 전용 인스턴스 (쿠키 제외)
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || '네트워크 오류가 발생했습니다.';
    console.error('API error:', errorMessage);
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

// 🍽️ 레스토랑 관련 API
export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await publicApi.get('/api/restaurants');
    return response.data;
  },
  createRestaurant: async (payload) => {
    const response = await api.post('/api/restaurants', payload);
    return response.data;
  },
  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/api/restaurants/${id}`, payload);
    return response.data;
  },
  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.status;
  },
  getRestaurantById: async (id) => {
    const response = await publicApi.get(`/api/restaurants/${id}`);
    return response.data;
  },
  getPopularRestaurants: async () => {
    const response = await publicApi.get('/api/restaurants/popular');
    return response.data;
  },
};

// ✉️ 제보 관련 API
export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/api/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/api/submissions', { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/api/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};

// ✅ 기본 내보내기
export default api;