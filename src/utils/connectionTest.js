import axios from 'axios';
import env from '../config/environment';

// 서버 연결 상태 테스트
export const testConnection = async () => {
  try {
    console.log('🔍 서버 연결 테스트 시작...');
    
    // 1. 헬스체크
    const healthResponse = await axios.get(`${environment.API_URL}/health`);
    console.log('✅ 서버 헬스체크 성공:', healthResponse.data);
    
    // 2. API 엔드포인트 테스트
    const apiResponse = await axios.get(`${environment.API_URL}/api/restaurants`);
    console.log('✅ API 엔드포인트 테스트 성공:', apiResponse.data);
    
    return {
      success: true,
      message: '서버 연결이 정상입니다.',
      data: {
        health: healthResponse.data,
        api: apiResponse.data
      }
    };
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error);
    return {
      success: false,
      message: '서버 연결에 실패했습니다.',
      error: error.message
    };
  }
};

// 특정 엔드포인트 테스트
export const testEndpoint = async (endpoint) => {
  try {
    const response = await axios.get(`${environment.API_URL}${endpoint}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};