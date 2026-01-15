// src/selectors/dashboardSelector.ts
import { createSelector } from 'reselect';
import type { RootState } from '../store';
import _ from 'lodash';
import type { DetailType } from '../types/Dashboard';

export const getDashboardList = (state: RootState): DetailType[] => {
  const list: DetailType[] | undefined = state?.Dashboard?.DashboardData?.list;
  return Array.isArray(list) ? list: [];
};

export const selectDataGroupByName = createSelector(
  [getDashboardList],
  (list: DetailType[]): Record<string, DetailType[]> => _.groupBy(list, 'name')
);

export const selectPersonNames = createSelector(
  [selectDataGroupByName],
  (groupedData): string[] => {
    return _.keys(groupedData).sort((a, b): number => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }
);

export const makeSelectDataByPerson = (): (state: RootState, name: string) => DetailType[] => 
  createSelector(
    [ selectDataGroupByName, (_state: RootState, name: string): string => name,],
    (groupedData, name): DetailType[] => groupedData[name] ?? []
  );