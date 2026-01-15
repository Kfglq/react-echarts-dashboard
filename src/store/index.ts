// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import type { Middleware, Tuple } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import subscription from "./subscription";
import rootReducer from '@/reducers';
import rootSaga from '@/sagas'

// 創建 saga 中介
const sagaMiddleware = createSagaMiddleware();

// 創建 Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware): Tuple<Middleware[]> => getDefaultMiddleware().concat(sagaMiddleware),
});

// 啟動 saga
sagaMiddleware.run(rootSaga);
subscription(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
