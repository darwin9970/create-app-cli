import ErrorBoundary from '@/components/ErrorBoundary';
import { logout } from '@/services';
import { useAppStore, useUserStore } from '@/stores';
import {
  DashboardOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { history, Outlet, useLocation } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Avatar, Badge, Dropdown, Layout, Menu, message } from 'antd';
import { FC } from 'react';
import styles from './BasicLayout.less';

const { Header, Sider, Content } = Layout;

// 顶部模块配置
const topModules = [
  {
    key: '/dashboard',
    label: '工作台',
    defaultPath: '/dashboard/analysis'
  },
  {
    key: '/system',
    label: '系统管理',
    defaultPath: '/system/settings'
  }
];

// 左侧菜单配置
const siderMenuConfig: Record<string, any[]> = {
  '/dashboard': [
    {
      key: '/dashboard/analysis',
      label: '分析页',
      icon: <DashboardOutlined />
    }
  ],
  '/system': [
    {
      key: '/system/settings',
      label: '系统设置',
      icon: <SettingOutlined />
    }
  ]
};

const BasicLayout: FC = () => {
  const location = useLocation();

  // Zustand stores
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUser = useUserStore((state) => state.clearUser);
  const collapsed = useAppStore((state) => state.collapsed);
  const setCollapsed = useAppStore((state) => state.setCollapsed);
  const toggleCollapsed = useAppStore((state) => state.toggleCollapsed);

  const { run: handleLogout, loading } = useRequest(logout, {
    manual: true,
    onSuccess: () => {
      message.success('已退出登录');
      clearUser();
      history.push('/login');
    }
  });

  // 获取当前顶部模块
  const currentTopModule = topModules.find((m) =>
    location.pathname.startsWith(m.key)
  );
  const currentTopModuleKey = currentTopModule?.key || '/dashboard';

  // 获取当前模块的左侧菜单
  const getSiderMenuItems = () => {
    for (const [prefix, items] of Object.entries(siderMenuConfig)) {
      if (location.pathname.startsWith(prefix)) {
        return items;
      }
    }
    return [];
  };
  const siderMenuItems = getSiderMenuItems();

  // 判断是否显示左侧菜单
  const showSider = siderMenuItems.length > 0;

  return (
    <Layout className={styles.layout}>
      {/* Header */}
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <img
              src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
              alt="logo"
            />
            <span>通用后台</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* 顶部模块导航 */}
          <Menu
            mode="horizontal"
            selectedKeys={[currentTopModuleKey]}
            items={topModules.map((m) => ({
              key: m.key,
              label: m.label
            }))}
            onClick={({ key }) => {
              const mod = topModules.find((m) => m.key === key);
              if (mod?.defaultPath) {
                history.push(mod.defaultPath);
              }
            }}
            className={styles.moduleMenu}
          />

          {/* 消息通知 */}
          <Badge count={99} overflowCount={99} size="small">
            <span className={styles.bellIcon}>🔔</span>
          </Badge>

          {/* 用户下拉 */}
          <Dropdown
            menu={{
              items: [
                { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
                {
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: '个人设置'
                },
                { type: 'divider' },
                {
                  key: 'logout',
                  icon: loading ? <LoadingOutlined /> : <LogoutOutlined />,
                  label: '退出登录',
                  disabled: loading,
                  onClick: () => {
                    handleLogout();
                  }
                }
              ]
            }}
          >
            <div className={styles.userInfo}>
              <Avatar
                size="small"
                src={
                  userInfo?.avatar ||
                  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                }
              />
              <span className={styles.userName}>
                {userInfo?.name || '未登录'}
              </span>
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        {/* Sidebar - 仅在需要时显示 */}
        {showSider && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            className={styles.sider}
            width={200}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              defaultOpenKeys={[]}
              items={siderMenuItems}
              onClick={({ key }) => history.push(key)}
              className={styles.siderMenu}
            />
            <div className={styles.siderFooter}>
              <div className={styles.trigger} onClick={toggleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </div>
          </Sider>
        )}

        {/* Content */}
        <Content className={showSider ? styles.content : styles.contentFull}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
