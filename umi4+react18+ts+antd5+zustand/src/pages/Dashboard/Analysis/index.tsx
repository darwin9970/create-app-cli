import { useChart } from '@/hooks';
import { getAnalysisChartData } from '@/services';
import { useRequest } from 'ahooks';
import { Card, Spin, Typography } from 'antd';
import { FC, useMemo } from 'react';

const Analysis: FC = () => {
  const { data, loading } = useRequest(getAnalysisChartData);

  console.log('Analysis Page Data:', data);

  const chartOptions = useMemo(() => {
    if (!data?.data) return undefined;

    const chartData = data.data;
    return {
      tooltip: {
        trigger: 'axis' as const
      },
      legend: {
        data: chartData.series.map((item: any) => item.name)
      },
      xAxis: {
        type: 'category' as const,
        data: chartData.xAxis
      },
      yAxis: {
        type: 'value' as const
      },
      series: chartData.series as any[]
    };
  }, [data]);

  const { chartRef } = useChart(chartOptions);

  return (
    <Card>
      <Typography.Title level={2}>分析页</Typography.Title>
      <Typography.Paragraph>
        这是一个使用 useRequest 和 useChart 的示例。
      </Typography.Paragraph>
      <Spin spinning={loading}>
        <div ref={chartRef} style={{ width: '100%', height: 400 }} />
      </Spin>
    </Card>
  );
};

export default Analysis;
