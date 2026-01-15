// src/reducers/global.ts
// 新版reducers 只需要加initialState和stateKeys
// page中會取到state中的stateKeys
// saga中會取到actions中的SAVE_[stateKeys]
// slice因為寫法變複雜，所以使用reduce串好，避免頁面過於攏長
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface StateType {
  ScreenWidth: number;
  ScreenHeight: number;
  IsTablet: boolean;
  IsMobile: boolean;
  Message: string;
  IsLoading: boolean;
  IsError: boolean;
  DropdownList: Record<string, unknown>;
}

const initialState: StateType = {
  ScreenWidth: 1920,
  ScreenHeight: 1080,
  IsTablet: false,
  IsMobile: false,
  Message: "",
  IsLoading: false,
  IsError: false,
  DropdownList: {},
};

type CaseReducers = {
  [K in keyof StateType as `SAVE_${K}`]: (
    state: StateType,
    action: PayloadAction<StateType[K]>
  ) => void;
};

const stateKeys = Object.keys(initialState) as (keyof StateType)[];

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    ...stateKeys.reduce((acc, key): CaseReducers => {
      const actionName = `SAVE_${key}` as const;
      const reducer = (state: StateType, action: PayloadAction<StateType>): void => {
        const stateAsRecord = state as unknown as Record<keyof StateType, unknown>;
        stateAsRecord[key] = action.payload;
      };
      (acc as Record<string, unknown>)[actionName] = reducer;
      return acc;
    },{} as CaseReducers),
    SAVE_IsLoading: (state: StateType, action: PayloadAction<boolean>): void => {
      state.IsLoading = action.payload;
      if (action.payload) {
        state.IsError = false;
      }
    },
  },
});

// Export actions
export const actions = slice.actions;

// Export reducer
export default slice.reducer;
