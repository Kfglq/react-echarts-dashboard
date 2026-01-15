// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GENERATE_SOURCEMAP: boolean;
  readonly VITE_REACT_APP_ENV: string;
  readonly VITE_REACT_APP_PROTOCOL: string;
  readonly VITE_REACT_APP_HOST: string;
  readonly VITE_REACT_APP_PORT: number | null;
  readonly VITE_REACT_APP_ROUTE_PREFIX: string | null;
  readonly VITE_REACT_API_PROTOCOL: string;
  readonly VITE_REACT_API_HOST: string;
  readonly VITE_REACT_API_PORT: number | null;
  readonly VITE_REACT_API_PREFIX: string | null;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
