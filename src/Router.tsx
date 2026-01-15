// src/Router.tsx
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import _ from "lodash";

import type { RouteConfig } from "./types/route";
import type { JSX } from "react"

import routeList from "./routes";

const renderRoute = ({
  key,
  path,
  layout: Layout,
  component: Component,
  title,
  description,
}: RouteConfig): JSX.Element => {
  return (
    <Route
      key={key}
      path={path}
      element={
        <Layout title={title}>
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </Helmet>
          <Component />
        </Layout>
      }
    />
  );
};

const Router = (): JSX.Element => {
  return (
    <Routes>
      {_.map(routeList, (route: RouteConfig): JSX.Element => renderRoute(route))}
    </Routes>
  );
};

export default Router;