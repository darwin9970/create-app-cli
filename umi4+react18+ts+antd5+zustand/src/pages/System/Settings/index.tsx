import { PageContainer, SearchForm } from '@/components';
import { COMMON_STATUS_OPTIONS } from '@/constants';
import { getUserList, UserListParams, UserRecord } from '@/services';
import { useRequest } from 'ahooks';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

const columns: ColumnsType<UserRecord> = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', width: 100 },
  { title: '手机号', dataIndex: 'phone', width: 140 },
  { title: '邮箱', dataIndex: 'email', width: 180 },
  { title: '部门', dataIndex: 'department', width: 100 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    render: (status: number) => (
      <Tag color={status === 1 ? 'success' : 'default'}>
        {status === 1 ? '启用' : '禁用'}
      </Tag>
    )
  },
  { title: '创建时间', dataIndex: 'createTime', width: 180 }
];

const Settings: FC = () => {
  // 受控模式表单实例
  const [controlledForm] = Form.useForm();

  // ========== 非受控模式：使用 useRequest ==========
  const {
    data: uncontrolledRes,
    loading: uncontrolledLoading,
    run: runUncontrolled
  } = useRequest(getUserList, {
    onSuccess: (res) => {
      message.success(`查询到 ${res?.data?.total || 0} 条数据`);
    }
  });
  const uncontrolledData = uncontrolledRes?.data?.list || [];

  // ========== 受控模式：使用 useRequest ==========
  const {
    data: controlledRes,
    loading: controlledLoading,
    run: runControlled
  } = useRequest(getUserList, {
    onSuccess: (res) => {
      message.success(`查询到 ${res?.data?.total || 0} 条数据`);
    }
  });
  const controlledData = controlledRes?.data?.list || [];

  // ========== 非受控模式处理 ==========
  const handleUncontrolledSearch = (values: Record<string, unknown>) => {
    // 格式化日期范围
    const { createTime, ...rest } = values;
    const params: Record<string, unknown> = { ...rest };
    if (Array.isArray(createTime) && createTime.length === 2) {
      const [start, end] = createTime as unknown as Array<{
        format: (fmt: string) => string;
      }>;
      params.startTime = start.format('YYYY-MM-DD');
      params.endTime = end.format('YYYY-MM-DD');
    }
    if (process.env.UMI_ENV === 'dev') {
      console.log('【非受控模式】查询条件:', params);
    }
    runUncontrolled(params);
  };

  const handleUncontrolledReset = () => {
    runUncontrolled({});
    message.info('已重置');
  };

  // ========== 受控模式处理 ==========
  const handleControlledSearch = (values: UserListParams) => {
    if (process.env.UMI_ENV === 'dev') {
      console.log('【受控模式】查询条件:', values);
    }
    runControlled(values);
  };

  const handleControlledReset = () => {
    runControlled({});
    message.info('已重置');
  };

  // 受控模式：外部填充表单
  const handleFillForm = () => {
    controlledForm.setFieldsValue({
      name: '张三',
      department: '技术部',
      status: 1
    });
    message.success('已自动填充表单');
  };

  // 受控模式：外部获取表单值
  const handleGetFormValues = () => {
    const values = controlledForm.getFieldsValue();
    message.info(`当前表单值: ${JSON.stringify(values)}`);
  };

  return (
    <PageContainer
      title="系统设置"
      subTitle="SearchForm 组件示例"
      breadcrumb={[
        { title: '系统管理', path: '/system/settings' },
        { title: '系统设置' }
      ]}
    >
      <Row gutter={[16, 16]}>
        {/* 非受控模式示例 */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <span>非受控模式</span>
                <Tag color="blue">内部管理表单</Tag>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              不传入 <Typography.Text code>form</Typography.Text>{' '}
              属性，组件内部自动创建和管理表单实例。适用于简单场景。
            </Typography.Paragraph>

            <SearchForm
              onSearch={handleUncontrolledSearch}
              onReset={handleUncontrolledReset}
              loading={uncontrolledLoading}
              columns={4}
            >
              <Form.Item name="name" label="姓名">
                <Input placeholder="请输入姓名" allowClear />
              </Form.Item>
              <Form.Item name="phone" label="手机号">
                <Input placeholder="请输入手机号" allowClear />
              </Form.Item>
              <Form.Item name="status" label="状态">
                <Select
                  placeholder="请选择"
                  allowClear
                  options={[...COMMON_STATUS_OPTIONS]}
                />
              </Form.Item>
              <Form.Item name="createTime" label="创建时间">
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </SearchForm>

            <Table
              columns={columns}
              dataSource={uncontrolledData}
              rowKey="id"
              loading={uncontrolledLoading}
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>

        {/* 受控模式示例 */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <span>受控模式</span>
                <Tag color="green">外部控制表单</Tag>
              </Space>
            }
            extra={
              <Space>
                <Button onClick={handleFillForm}>自动填充</Button>
                <Button onClick={handleGetFormValues}>获取表单值</Button>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              传入 <Typography.Text code>form</Typography.Text>{' '}
              属性，父组件可以通过表单实例操作表单（填充值、获取值、校验等）。
            </Typography.Paragraph>

            <SearchForm
              form={controlledForm}
              onSearch={handleControlledSearch}
              onReset={handleControlledReset}
              loading={controlledLoading}
              columns={3}
            >
              <Form.Item name="name" label="姓名">
                <Input placeholder="请输入姓名" allowClear />
              </Form.Item>
              <Form.Item name="department" label="部门">
                <Select
                  placeholder="请选择"
                  allowClear
                  options={[
                    { label: '技术部', value: '技术部' },
                    { label: '产品部', value: '产品部' },
                    { label: '运营部', value: '运营部' }
                  ]}
                />
              </Form.Item>
              <Form.Item name="status" label="状态">
                <Select
                  placeholder="请选择"
                  allowClear
                  options={[...COMMON_STATUS_OPTIONS]}
                />
              </Form.Item>
            </SearchForm>

            <Table
              columns={columns}
              dataSource={controlledData}
              rowKey="id"
              loading={controlledLoading}
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Settings;
