// 환경별 설정 관리
const getEnvironmentConfig = () => {
    const isDevelopment = import.meta.env.DEV;
    const isProduction = import.meta.env.PROD;
    
    // 기본 설정
    const config = {
      development: {
        apiUrl: 'http://localhost:5000',
        clientUrl: 'http://localhost:5173',
      },
      production: {
        // 환경변수에서 URL 가져오기, 없으면 기본값 사용
        apiUrl: import.meta.env.VITE_API_URL || 'https://pwd-week6-server.onrender.com',
        clientUrl: import.meta.env.VITE_CLIENT_URL || 'https://pwd-week6-client.vercel.app',
      }
    };
  
    // 환경변수가 있으면 우선 사용
    if (import.meta.env.VITE_API_URL) {
      config.development.apiUrl = import.meta.env.VITE_API_URL;
      config.production.apiUrl = import.meta.env.VITE_API_URL;
    }
  
    if (import.meta.env.VITE_CLIENT_URL) {
      config.development.clientUrl = import.meta.env.VITE_CLIENT_URL;
      config.production.clientUrl = import.meta.env.VITE_CLIENT_URL;
    }
  
    return isDevelopment ? config.development : config.production;
  };
  
  const env = getEnvironmentConfig();
  
  export default env;
  
  // 개별 export
  export const { apiUrl, clientUrl } = env;
  
  // 디버깅용
  console.log('🌍 Environment Config:', {
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    apiUrl: env.apiUrl,
    clientUrl: env.clientUrl,
    viteApiUrl: import.meta.env.VITE_API_URL,
    viteClientUrl: import.meta.env.VITE_CLIENT_URL
  });