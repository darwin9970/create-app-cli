import { PageContainer } from '@/components';
import { Card, Typography } from 'antd';
import { FC } from 'react';

const DataList: FC = () => {
  return (
    <PageContainer
      title="数据列表"
      subTitle="查看和管理数据"
      breadcrumb={[{ title: '数据管理', path: '/data' }, { title: '数据列表' }]}
    >
      <Card>
        <Typography.Paragraph type="secondary">
          📊 数据列表页面（动态路由示例）
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default DataList;
