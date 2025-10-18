import { apiUrl } from '../config/environment';

/**
 * 서버에서 내려온 이미지 경로를 실제 접근 가능한 URL로 변환한다.
 * - 절대 URL이면 그대로 사용
 * - // 로 시작하면 https 프로토콜을 붙여 사용
 * - / 또는 상대경로면 API 서버 URL을 붙여 반환
 */
export const resolveImageUrl = (value) => {
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  const base = apiUrl.replace(/\/+$/, '');
  const path = value.startsWith('/') ? value : `/${value}`;

  return `${base}${path}`;
};

export default resolveImageUrl;
