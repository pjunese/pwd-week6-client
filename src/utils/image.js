import { apiUrl } from '../config/environment';

const FALLBACK_IMAGE_DATA_URL =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22 viewBox=%220 0 300 200%22%3E%3Crect width=%22300%22 height=%22200%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';

const normaliseBaseUrl = () => {
  try {
    const trimmed = (apiUrl || '').trim();
    if (!trimmed) return null;
    return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
  } catch (error) {
    console.warn('이미지 URL 기본 경로 계산 실패:', error);
    return null;
  }
};

const apiBase = normaliseBaseUrl();

/**
 * 서버에서 내려온 이미지 경로를 실제 접근 가능한 URL로 변환한다.
 * - 절대 URL이면 그대로 사용
 * - // 로 시작하면 https 프로토콜을 붙여 사용
 * - 그 외에는 API 서버 기준으로 상대 경로를 절대 경로로 변환
 */
export const resolveImageUrl = (value) => {
  if (!value) return FALLBACK_IMAGE_DATA_URL;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  try {
    const origin = apiBase ?? `${window.location.origin}/`;
    return new URL(value, origin).toString();
  } catch (error) {
    console.warn('이미지 URL 변환 실패:', { value, error });
    return FALLBACK_IMAGE_DATA_URL;
  }
};

export default resolveImageUrl;
