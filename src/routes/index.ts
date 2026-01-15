// src/routes/index.ts
import type { RouteConfig } from '../types/route';

// layouts
import Layout from "@/layouts/Layout";
// pages
import Dashboard from "@/pages/Dashboard";

const routes: RouteConfig[] = [
  {
    key: "",
    path: "",
    layout: Layout,
    component: Dashboard,
    title: "圖表",
    description: "儀錶板",
  },
];

export default routes;
