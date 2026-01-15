// src/components/ChartCard.tsx
import React, { useEffect, useMemo, useRef, type JSX } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import * as echarts from "echarts";
import type { RootState } from "@/store";
import { makeSelectDataByPerson } from "@/selectors/DashboardSelector";
import type { DetailType } from "@/types/Dashboard";

const ChartCard: React.FC<{ personName: string }> = React.memo(({ personName }): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const selectDataByPerson = useMemo((): (state: RootState, name: string) => DetailType[] => makeSelectDataByPerson(), []);
  const data = useSelector((state: RootState): DetailType[] => selectDataByPerson(state, personName));

  useEffect(() => {
    if (chartRef.current) {
      instanceRef.current = echarts.init(chartRef.current, undefined, { 
        renderer: 'svg',
        devicePixelRatio: 1
      });
    }
    return (): void => instanceRef.current?.dispose();
  }, []);

  useEffect((): void => {
    if (instanceRef.current && data.length > 0) {
      instanceRef.current.setOption({
        grid: { top: 5, bottom: 5, left: 5, right: 5 },
        xAxis: { type: 'category', data: _.map(data, 'time'), axisLabel: { show: true, formatter: (value: string): string => {
          const parts = value.split(':');
          return parts.length === 3 ? `${parts[2]}s` : value; 
        }}},
        yAxis: { type: 'value', min: 0, max: 100 },
        series: [{
          data: _.map(data, 'value'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          sampling: 'lttb'
        }],
        animation: true,
        silent: true,
      }, { notMerge: true });
    }
  }, [data, personName]);

  return <div ref={chartRef} style={{ height: '150px', width: '100%' }} />;
});

export default ChartCard;
