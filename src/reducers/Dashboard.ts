// src/reducers/Dashboard.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardResult } from '@/types/Dashboard';

export interface StateType {
  DashboardData: DashboardResult | null;
}

const initialState: StateType = {
  DashboardData: null,
};

type CaseReducers = {
  [K in keyof StateType as `SAVE_${K}`]: (
    state: StateType,
    action: PayloadAction<StateType[K]>
  ) => void;
};

const stateKeys = Object.keys(initialState) as (keyof StateType)[];

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    ...stateKeys.reduce((acc, key): CaseReducers => {
      const actionName = `SAVE_${key}` as const;
      const reducer = (state: StateType, action: PayloadAction<unknown>): void => {
        const stateAsRecord = state as unknown as Record<keyof StateType, unknown>;
        stateAsRecord[key] = action.payload;
      };
      (acc as Record<string, unknown>)[actionName] = reducer;
      return acc;
    },{} as CaseReducers),
  },
});

// Export actions
export const actions = slice.actions;

// Export reducer
export default slice.reducer;
