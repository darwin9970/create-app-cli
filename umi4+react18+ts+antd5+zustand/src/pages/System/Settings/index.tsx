import { Card, Typography } from 'antd';
import { FC } from 'react';

const Settings: FC = () => {
  return (
    <Card>
      <Typography.Title level={2}>系统设置</Typography.Title>
      <Typography.Paragraph>
        这是一个通用的系统设置页面占位符。
      </Typography.Paragraph>
    </Card>
  );
};

export default Settings;
