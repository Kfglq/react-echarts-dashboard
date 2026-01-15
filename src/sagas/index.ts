// src/sagas/index.ts
import { all, type AllEffect } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import global from "./global";
import Dashboard from "./Dashboard";

export default function* rootSaga(): Generator<AllEffect<SagaIterator>, void, unknown> {
  yield all([
    global(),
    Dashboard(),
  ]);
}
