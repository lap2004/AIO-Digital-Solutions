/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_SITE_NAME?: string;
  readonly VITE_CONTACT_HOTLINE?: string;
  readonly VITE_CONTACT_ZALO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
