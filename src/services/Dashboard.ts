// src/services/Dashboard.ts
// import request from "../utils/request";
import _ from "lodash";
// import type { DashboardPayload, DashboardResponse } from "../types/Dashboard";

// export const Dashboard_Data = async (payload: DashboardPayload, token?: string): Promise<DashboardResponse> => 
//   await request.post<DashboardResponse>("/Dashboard/Data", payload, { headers: token ? { Authorization: token } : {} });

// export const Dashboard_Data = async (_payload: DashboardPayload, _token?: string): Promise<DashboardResponse> => {
//   await new Promise<void>((resolve: () => void): void => {
//     setTimeout((): void => resolve(), 100);
//   });
//   const categories: string[] = _.map(_.range(3), (i: number): string => `類別${i + 1}`);
//   const names: string[] = _.map(_.range(10), (i: number): string => `人員${i + 1}`);
//   const timePoints: number[] = _.range(60);
//   const list: DetailType[] = _.flatMap(categories, (category: string): DetailType[] =>
//     _.flatMap(names, (name: string): DetailType[] => 
//       _.map(timePoints, (secoundAgo: number): DetailType => {
//           const timeStr = moment().subtract(secoundAgo, "seconds").format("HH:mm:ss");
//         return {
//           id: _.uniqueId(`${category}_${name}_${secoundAgo}_`),
//           name,
//           category,
//           value: _.random(0, 100),
//           time: timeStr,
//         };
//       })
//     )
//   );
//   const response: DashboardResponse = { status: true, message: "成功", result: { list } };
//   return response;
// };
