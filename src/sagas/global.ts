// src/sagas/global.ts
import { put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import _ from "lodash";
import { actions } from "@/reducers/global";

function* SAVE_IsLoadingEffect({ payload }: { payload: boolean; type: string }): SagaIterator {
  try {
    yield put(actions.SAVE_IsLoading(payload));
  }catch (error) {
    console.log("lodaing失敗:",error);
  }
}

export default function* global(): SagaIterator {
  yield takeLatest("SAVE_IsLoading", SAVE_IsLoadingEffect);
}
