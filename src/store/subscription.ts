// src/store/subscription.ts
import type { EnhancedStore } from '@reduxjs/toolkit';
import _ from "lodash";
import { actions } from "@/reducers/global";
import type { AppDispatch } from "./index"; 

const updateDisplayMode = (dispatch: AppDispatch): void => {
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  const isMobile: boolean = width < 768;
  const isTablet: boolean = width >= 768 && width < 1024;

  dispatch(actions.SAVE_ScreenWidth(width));
  dispatch(actions.SAVE_ScreenHeight(height));
  dispatch(actions.SAVE_IsMobile(isMobile));
  dispatch(actions.SAVE_IsTablet(isTablet));
};

const onReSize = ({ dispatch }: { dispatch: AppDispatch }): void => {
  window.addEventListener("resize", (): void => {
    updateDisplayMode(dispatch);
  });
};

const onLoad = ({ dispatch }: { dispatch: AppDispatch }): void => {
  window.addEventListener("load", (): void => {
    updateDisplayMode(dispatch);
  });
};

const root = (store: EnhancedStore): void => {
  const { dispatch }: { dispatch: AppDispatch } = store;

  onReSize({ dispatch });
  onLoad({ dispatch });
  updateDisplayMode(dispatch);
};

export default root;