import { PageContainer } from '@/components';
import { Card, Typography } from 'antd';
import { FC } from 'react';

const DataImport: FC = () => {
  return (
    <PageContainer
      title="数据导入"
      subTitle="导入外部数据"
      breadcrumb={[{ title: '数据管理', path: '/data' }, { title: '数据导入' }]}
    >
      <Card>
        <Typography.Paragraph type="secondary">
          📥 数据导入页面（动态路由示例）
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default DataImport;
