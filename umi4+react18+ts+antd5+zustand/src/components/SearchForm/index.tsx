import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { FormInstance, FormProps } from 'antd';
import { Button, Col, Form, Row, Space } from 'antd';
import { FC, ReactNode, useState } from 'react';
import styles from './index.less';

export interface SearchFormProps<T = any> extends Omit<FormProps, 'onFinish'> {
  /** 表单项 */
  children: ReactNode;
  /** 查询回调 */
  onSearch?: (values: T) => void;
  /** 重置回调 */
  onReset?: () => void;
  /** 默认展示的表单项数量，超过则折叠，默认 3 */
  defaultCollapseCount?: number;
  /** 是否显示展开/收起按钮，默认 true */
  showCollapse?: boolean;
  /** 是否显示重置按钮，默认 true */
  showReset?: boolean;
  /** 查询按钮文字 */
  searchText?: string;
  /** 重置按钮文字 */
  resetText?: string;
  /** 查询按钮 loading */
  loading?: boolean;
  /** 自定义操作按钮 */
  extra?: ReactNode;
  /** 表单实例 */
  form?: FormInstance;
  /** 每行列数，默认 3 */
  columns?: number;
}

const SearchForm: FC<SearchFormProps> = ({
  children,
  onSearch,
  onReset,
  defaultCollapseCount = 3,
  showCollapse = true,
  showReset = true,
  searchText = '查询',
  resetText = '重置',
  loading = false,
  extra,
  form: propForm,
  columns = 3,
  ...formProps
}) => {
  const [form] = Form.useForm();
  const formInstance = propForm || form;
  const [collapsed, setCollapsed] = useState(true);

  // 处理子元素，添加 Col 包装
  const childrenArray = Array.isArray(children) ? children : [children];
  const validChildren = childrenArray.filter(Boolean);
  const shouldCollapse =
    showCollapse && validChildren.length > defaultCollapseCount;

  const handleSearch = async () => {
    try {
      const values = await formInstance.validateFields();
      onSearch?.(values);
    } catch (error) {
      // 表单验证失败，不处理
    }
  };

  const handleReset = () => {
    formInstance.resetFields();
    onReset?.();
  };

  const colSpan = 24 / columns;

  return (
    <div className={styles.searchForm}>
      <Form
        form={formInstance}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        {...formProps}
      >
        <Row gutter={16}>
          {validChildren.map((child, index) => {
            // 折叠状态下只显示前 defaultCollapseCount 个
            if (collapsed && shouldCollapse && index >= defaultCollapseCount) {
              return null;
            }
            return (
              <Col key={index} span={colSpan}>
                {child}
              </Col>
            );
          })}

          {/* 操作按钮列 */}
          <Col span={colSpan} className={styles.actionCol}>
            <Form.Item className={styles.actionItem}>
              <Space>
                <Button type="primary" onClick={handleSearch} loading={loading}>
                  {searchText}
                </Button>
                {showReset && (
                  <Button onClick={handleReset}>{resetText}</Button>
                )}
                {shouldCollapse && (
                  <Button
                    type="link"
                    onClick={() => setCollapsed(!collapsed)}
                    className={styles.collapseBtn}
                  >
                    {collapsed ? '展开' : '收起'}
                    {collapsed ? <DownOutlined /> : <UpOutlined />}
                  </Button>
                )}
                {extra}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
