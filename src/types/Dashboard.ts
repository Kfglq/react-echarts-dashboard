// src/types/dashboard.ts
import type { ResponseType } from "./response";

export interface DashboardPayload {
  startDate: string;
  endDate: string;
}

export interface DashboardResult {
  list: DetailType[];
}

export interface DetailType {
  id: string;
  name: string;
  category: string;
  value: number;
  time: string;
}

export type DashboardResponse = ResponseType & { result: DashboardResult };