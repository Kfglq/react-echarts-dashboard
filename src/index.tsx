// src/index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import RouterApp from "./Router";
import './index.scss'

const prefix = import.meta.env.VITE_REACT_APP_ROUTE_PREFIX ?? '';
const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={prefix}>
          <RouterApp />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    "Failed to find the root element. Please ensure there is a corresponding HTML element with the ID 'root'."
  );
}
