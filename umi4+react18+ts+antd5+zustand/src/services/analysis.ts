import type { ApiResponse } from '@/types';
import request from '@/utils/request';

export interface ChartData {
  xAxis: string[];
  series: {
    name: string;
    data: number[];
    type: string;
  }[];
}

/**
 * 获取分析页图表数据
 */
export async function getAnalysisChartData() {
  return request.get<ApiResponse<ChartData>>('/api/analysis/chart');
}
