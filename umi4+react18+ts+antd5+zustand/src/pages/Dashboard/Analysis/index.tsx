import { PageContainer } from '@/components';
import { useChart } from '@/hooks';
import { getAnalysisChartData } from '@/services';
import { useRequest } from 'ahooks';
import { Card } from 'antd';
import { FC, useMemo } from 'react';

const Analysis: FC = () => {
  const { data, loading, refresh } = useRequest(getAnalysisChartData);

  const chartOptions = useMemo(() => {
    if (!data?.data) return undefined;
    const chartData = data.data;
    return {
      tooltip: { trigger: 'axis' as const },
      legend: { data: chartData.series.map((item: any) => item.name) },
      xAxis: { type: 'category' as const, data: chartData.xAxis },
      yAxis: { type: 'value' as const },
      series: chartData.series as any[]
    };
  }, [data]);

  const { chartRef } = useChart(chartOptions);

  return (
    <PageContainer
      title="数据分析"
      subTitle="实时数据监控与分析"
      breadcrumb={[
        { title: '工作台', path: '/dashboard/analysis' },
        { title: '数据分析' }
      ]}
      onRefresh={refresh}
      loading={loading}
    >
      <Card title="趋势图表">
        <div ref={chartRef} style={{ width: '100%', height: 400 }} />
      </Card>
    </PageContainer>
  );
};

export default Analysis;
