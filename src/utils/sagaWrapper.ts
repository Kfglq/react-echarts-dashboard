// src/utils/sagaWrapper.ts
import { put, type PutEffect, type Effect } from "redux-saga/effects";
import { actions as globalActions } from "../reducers/global";
import { getStorage } from "./storage";
import { showMessage } from "./message";
import type { ResponseType } from "@/types/response"

export function* safeSaga<T extends ResponseType | void>(
  effect: (token: string | undefined) => Generator<Effect, T, unknown>,
  isAuth = false,
  successMessage = false,
): Generator<Effect | PutEffect, T | undefined, unknown> {
  try {
    yield put(globalActions.SAVE_IsLoading(true));
    const { token } = getStorage();
    const response: T = yield* effect(isAuth ? token : undefined);
    yield put(globalActions.SAVE_IsLoading(false));
    if (successMessage){
      if (response && typeof response === 'object' && 'status' in response && response.status) {
        showMessage.success(response.message ?? "操作成功");
      }else{
        showMessage.error(response);
      }
    }
    return response;
  } catch (error: unknown) {
    const isAuthError = showMessage.error(error);
    yield put(globalActions.SAVE_IsError(true));
    yield put(globalActions.SAVE_IsLoading(false));
    if (isAuth && isAuthError) yield put({ type: "Admin_Logout" });
    return undefined;
  }
}
