// src/sagas/Dashboard.ts
// import { put, takeLatest, call, type Effect } from "redux-saga/effects";
// import type { SagaIterator } from "redux-saga";
// import * as Service from "@/services/Dashboard"
// import { actions } from "@/reducers/Dashboard";
// import { safeSaga } from "@/utils/sagaWrapper";
// import type { DashboardPayload, DashboardResponse, DashboardResult } from "@/types/Dashboard";

// // Dashboard Effects
// function* Dashboard_DataEffect({ payload }: { payload: DashboardPayload; type: string }): SagaIterator {
//   yield* safeSaga<DashboardResponse>(function* (token): Generator<Effect, DashboardResponse, unknown> {
//     const response = (yield call(Service.Dashboard_Data, payload, token)) as DashboardResponse;
//     const result: DashboardResult = response.result;
//     yield put(actions.SAVE_DashboardData(result));
//     return response;
//   }, true, true);
// }

import { put, takeLatest, select, delay } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import _ from "lodash";
import moment from "moment";

import { actions } from "@/reducers/Dashboard";
import { getDashboardList } from "@/selectors/DashboardSelector";
import type { DashboardPayload, DetailType } from "@/types/Dashboard";

function* Dashboard_DataEffect({ _payload }: { _payload: DashboardPayload; type: string }): SagaIterator {
  let tick = 0;
  while (true) {
    const currentList = (yield select(getDashboardList)) as DetailType[];
    const nowMoment = moment();
    const nowStr: string = nowMoment.format("HH:mm:ss");
    
    const expirationThreshold = nowMoment.subtract(60, "seconds");

    const configs = [
      { cat: "類別1", freq: 1, range: _.range(1, 11) },
      { cat: "類別2", freq: 3, range: _.range(1, 11) },
      { cat: "類別3", freq: 5, range: _.range(1, 11) },
    ];

    const newPoints: DetailType[] = _.flatMap(configs, (config): DetailType[] => {
      if (tick % config.freq === 0) {
        return _.map(config.range, (i: number): DetailType => ({
          id: _.uniqueId(`live_${i}_`),
          name: `${config.cat} - 人員${i}`,
          category: config.cat,
          value: _.random(0, 100),
          time: nowStr,
        }));
      }
      return [];
    });
    const filteredList = _.filter(currentList, (item): boolean => {
      return moment(item.time, "HH:mm:ss").isAfter(expirationThreshold);
    });

    const updatedList: DetailType[] = [...filteredList, ...newPoints];
    yield put(actions.SAVE_DashboardData({ list: updatedList }));

    tick++;
    yield delay(1000);
  }
}

export default function* Dashboard(): SagaIterator {
  yield takeLatest("Dashboard_Data", Dashboard_DataEffect);
}