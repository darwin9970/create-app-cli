import { CodeEditor } from '@/components';
import { Node } from '@xyflow/react';
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  Tag
} from 'antd';
import { FC, useEffect } from 'react';
import { AppNodeData, NodeStatus, NodeType } from '../types';

interface NodeConfigDrawerProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
  onSave: (values: Partial<AppNodeData>) => void;
}

const NodeConfigDrawer: FC<NodeConfigDrawerProps> = ({
  open,
  node,
  onClose,
  onSave
}) => {
  const [form] = Form.useForm();
  const data = node?.data as AppNodeData | undefined;

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        label: data.label,
        description: data.description || '',
        // 开始节点
        triggerType: data.triggerType || 'manual',
        cron: data.cron || '',
        // 处理节点
        timeout: data.timeout || 30,
        retryCount: data.retryCount || 0,
        script: data.script || '',
        // 条件节点
        expression: data.expression || '',
        trueBranch: data.trueBranch || '',
        falseBranch: data.falseBranch || '',
        // 结束节点
        notifyOnSuccess: data.notifyOnSuccess ?? true,
        notifyOnError: data.notifyOnError ?? true,
        notifyChannels: data.notifyChannels || ['email']
      });
    } else {
      form.resetFields();
    }
  }, [open, data, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
    });
  };

  return (
    <Drawer
      title={`节点配置 - ${node?.data?.label || ''}`}
      placement="right"
      width={400}
      open={open}
      onClose={onClose}
      keyboard={false}
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        {/* 通用配置 */}
        <Form.Item
          name="label"
          label="节点名称"
          rules={[{ required: true, message: '请输入节点名称' }]}
        >
          <Input placeholder="请输入节点名称" />
        </Form.Item>

        <Form.Item name="description" label="节点描述">
          <Input.TextArea rows={2} placeholder="请输入节点描述" />
        </Form.Item>

        <Divider orientation="left" plain>
          {{
            start: '触发配置',
            process: '执行配置',
            condition: '条件配置',
            end: '通知配置'
          }[data?.nodeType as NodeType] || '节点配置'}
        </Divider>

        {/* 开始节点配置 */}
        {data?.nodeType === 'start' && (
          <>
            <Form.Item name="triggerType" label="触发方式">
              <Radio.Group>
                <Radio value="manual">手动触发</Radio>
                <Radio value="schedule">定时触发</Radio>
                <Radio value="api">API 触发</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prev, cur) => prev.triggerType !== cur.triggerType}
            >
              {({ getFieldValue }) =>
                getFieldValue('triggerType') === 'schedule' && (
                  <Form.Item
                    name="cron"
                    label="Cron 表达式"
                    rules={[{ required: true, message: '请输入 Cron 表达式' }]}
                  >
                    <Input placeholder="0 0 * * * ?" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </>
        )}

        {/* 处理节点配置 */}
        {data?.nodeType === 'process' && (
          <>
            <Form.Item name="timeout" label="超时时间（秒）">
              <InputNumber min={1} max={3600} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="retryCount" label="重试次数">
              <InputNumber min={0} max={10} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="script" label="执行脚本 (SQL)">
              <CodeEditor language="sql" height={180} title="编辑执行脚本" />
            </Form.Item>
          </>
        )}

        {/* 条件节点配置 */}
        {data?.nodeType === 'condition' && (
          <>
            <Form.Item
              name="expression"
              label="条件表达式 (JavaScript)"
              rules={[{ required: true, message: '请输入条件表达式' }]}
            >
              <CodeEditor
                language="javascript"
                height={80}
                title="编辑条件表达式"
              />
            </Form.Item>
            <Form.Item name="trueBranch" label="满足条件时">
              <Input placeholder="跳转到节点..." />
            </Form.Item>
            <Form.Item name="falseBranch" label="不满足条件时">
              <Input placeholder="跳转到节点..." />
            </Form.Item>
          </>
        )}

        {/* 结束节点配置 */}
        {data?.nodeType === 'end' && (
          <>
            <Form.Item
              name="notifyOnSuccess"
              label="成功时通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="notifyOnError"
              label="失败时通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="notifyChannels" label="通知渠道">
              <Select
                mode="multiple"
                placeholder="选择通知渠道"
                options={[
                  { label: '邮件', value: 'email' },
                  { label: '短信', value: 'sms' },
                  { label: '钉钉', value: 'dingtalk' },
                  { label: '企业微信', value: 'wechat' }
                ]}
              />
            </Form.Item>
          </>
        )}

        <Divider orientation="left" plain>
          节点信息
        </Divider>

        <Form.Item label="节点状态">
          <Tag
            color={
              {
                pending: 'default',
                running: 'processing',
                success: 'success',
                error: 'error'
              }[data?.status as NodeStatus] || 'default'
            }
          >
            {{
              pending: '待执行',
              running: '执行中',
              success: '成功',
              error: '失败'
            }[data?.status as NodeStatus] || '待执行'}
          </Tag>
        </Form.Item>

        <Form.Item label="节点 ID">
          <Input value={node?.id} disabled />
        </Form.Item>

        <Form.Item label="位置">
          <Space>
            <span>X: {node?.position?.x?.toFixed(0)}</span>
            <span>Y: {node?.position?.y?.toFixed(0)}</span>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NodeConfigDrawer;
