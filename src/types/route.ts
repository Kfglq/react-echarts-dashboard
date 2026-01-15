// src/types/routes.ts
import type { ComponentType, ReactNode } from 'react';

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export interface RouteConfig {
  key: string;
  path: string;
  layout: ComponentType<LayoutProps>;
  component: ComponentType;
  title: string;
  description: string;
}
