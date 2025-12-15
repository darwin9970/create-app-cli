import { ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space, Spin, Tooltip } from 'antd';
import { FC, ReactNode } from 'react';
import styles from './index.less';

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface PageContainerProps {
  /** 页面标题 */
  title?: ReactNode;
  /** 副标题 */
  subTitle?: ReactNode;
  /** 面包屑配置 */
  breadcrumb?: BreadcrumbItem[];
  /** 是否显示面包屑，默认 true */
  showBreadcrumb?: boolean;
  /** 页面右侧操作区 */
  extra?: ReactNode;
  /** 标题下方的描述内容 */
  content?: ReactNode;
  /** 标签栏 */
  tabList?: { key: string; tab: ReactNode }[];
  /** 当前激活的标签 */
  activeTabKey?: string;
  /** 标签切换回调 */
  onTabChange?: (key: string) => void;
  /** 是否加载中 */
  loading?: boolean;
  /** 页面内容 */
  children?: ReactNode;
  /** 刷新回调 */
  onRefresh?: () => void;
  /** 自定义类名 */
  className?: string;
}

const PageContainer: FC<PageContainerProps> = ({
  title,
  subTitle,
  breadcrumb,
  showBreadcrumb = true,
  extra,
  content,
  loading = false,
  children,
  onRefresh,
  className = ''
}) => {
  const breadcrumbItems = breadcrumb?.map((item, index) => ({
    key: index,
    title: item.path ? <a href={item.path}>{item.title}</a> : item.title
  }));

  return (
    <div className={`${styles.pageContainer} ${className}`}>
      {/* 面包屑 - 在 pageHeader 上方，无背景色 */}
      {showBreadcrumb && breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      )}

      {/* 页面头部 */}
      <div className={styles.pageHeader}>
        <div className={styles.headerMain}>
          <div className={styles.headerLeft}>
            {title && (
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>{title}</h1>
                {subTitle && (
                  <span className={styles.subTitle}>{subTitle}</span>
                )}
              </div>
            )}
            {content && <div className={styles.content}>{content}</div>}
          </div>

          <div className={styles.headerRight}>
            <Space>
              {onRefresh && (
                <Tooltip title="刷新">
                  <Button icon={<ReloadOutlined />} onClick={onRefresh} />
                </Tooltip>
              )}
              {extra}
            </Space>
          </div>
        </div>
      </div>

      {/* 页面内容 */}
      <div className={styles.pageContent}>
        <Spin spinning={loading}>{children}</Spin>
      </div>
    </div>
  );
};

export default PageContainer;
