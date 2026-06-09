/** Typed access to Vite env vars with safe defaults. */
interface AppEnv {
  apiBaseUrl: string;
  siteUrl: string;
  siteName: string;
  hotline: string;
  zalo: string;
  /** When false, repositories use in-memory mock data. */
  useRemoteApi: boolean;
}

const raw = import.meta.env;

export const env: AppEnv = {
  apiBaseUrl: (raw.VITE_API_BASE_URL as string) || '',
  siteUrl: (raw.VITE_SITE_URL as string) || 'https://aiogroup.vn',
  siteName: (raw.VITE_SITE_NAME as string) || 'AIO Digital Solutions',
  hotline: (raw.VITE_CONTACT_HOTLINE as string) || '1900 0000',
  zalo: (raw.VITE_CONTACT_ZALO as string) || '',
  useRemoteApi: Boolean(raw.VITE_API_BASE_URL),
};
