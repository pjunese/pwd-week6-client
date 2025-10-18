const DEFAULT_URLS = {
    development: {
      api: 'http://localhost:5000',
      client: 'http://localhost:5173',
    },
    production: {
      api: 'https://our-worlds-server.onrender.com',
      client: 'https://our-worlds.vercel.app',
    },
  };
  
  const normalizeUrl = (value, fallback) => {
    const raw = value?.trim() || fallback;
    return raw?.replace(/\/+$/, '') ?? '';
  };
  
  const mode = import.meta.env.MODE || (import.meta.env.PROD ? 'production' : 'development');
  const defaults = DEFAULT_URLS[mode] ?? DEFAULT_URLS.development;



// // 환경별 설정 관리
// const environment = {
//     // API URL 설정
//     API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    
//     // 클라이언트 URL 설정
//     CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
    
//     // 환경 모드
//     NODE_ENV: import.meta.env.NODE_ENV || 'development',
    
//     // 개발 환경 여부
//     isDevelopment: import.meta.env.NODE_ENV === 'development',
    
//     // 프로덕션 환경 여부
//     isProduction: import.meta.env.NODE_ENV === 'production'
//   };
  
//   export { environment };
const environment = {
    API_URL: normalizeUrl(import.meta.env.VITE_API_URL, defaults.api),
    CLIENT_URL: normalizeUrl(import.meta.env.VITE_CLIENT_URL, defaults.client),
    NODE_ENV: mode,
    isDevelopment: mode === 'development',
    isProduction: mode === 'production',
  };
  
  export { environment };
