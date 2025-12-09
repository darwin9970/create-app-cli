import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useDebounceFn } from 'ahooks';

/**
 * ECharts 通用 Hook
 * 自动处理 resize 和销毁
 * @param options ECharts 配置项
 * @returns [chartRef, chartInstance]
 */
export const useChart = (options?: echarts.EChartsOption) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  // 防抖 resize
  const { run: resize } = useDebounceFn(
    () => {
      chartInstance.current?.resize();
    },
    { wait: 100 }
  );

  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表
      chartInstance.current = echarts.init(chartRef.current);
    }

    // 监听窗口大小变化
    window.addEventListener('resize', resize);

    return () => {
      // 销毁
      window.removeEventListener('resize', resize);
      chartInstance.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (options && chartInstance.current) {
      chartInstance.current.setOption(options);
    }
  }, [options]);

  return {
    chartRef,
    chartInstance: chartInstance.current
  };
};
