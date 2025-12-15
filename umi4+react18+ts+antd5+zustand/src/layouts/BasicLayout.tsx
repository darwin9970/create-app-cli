import ErrorBoundary from '@/components/ErrorBoundary';
import { AntdStaticHolder, useAntdApp } from '@/hooks/useAppMessage';
import { logout, MenuItem } from '@/services';
import { useAppStore, useMenuStore, useUserStore } from '@/stores';
import * as Icons from '@ant-design/icons';
import {
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { history, Outlet, useLocation, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import type { MenuProps } from 'antd';
import { App, Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import { FC, useMemo } from 'react';
import styles from './BasicLayout.less';

const { Header, Sider, Content } = Layout;

/**
 * 根据图标名称获取图标组件
 */
const getIcon = (iconName?: string): React.ReactNode => {
  if (!iconName) return null;
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent /> : null;
};

/**
 * 从动态菜单提取顶部模块
 */
const getTopModules = (menus: MenuItem[]) => {
  return menus
    .filter((m) => m.path && m.name && !m.redirect)
    .map((m) => ({
      key: m.path,
      label: m.name,
      defaultPath: m.routes?.[0]?.path || m.path
    }));
};

/**
 * 将菜单数据转换为 Ant Design Menu 格式
 */
const menuToAntdItems = (menus: MenuItem[]): MenuProps['items'] => {
  return menus
    .filter((m) => !m.hideInMenu && !m.redirect && m.name)
    .map((m) => {
      const children = m.routes ? menuToAntdItems(m.routes) : undefined;
      return {
        key: m.path,
        label: m.name,
        icon: getIcon(m.icon),
        // 只有有子菜单时才设置 children，避免空数组问题
        children: children && children.length > 0 ? children : undefined
      };
    });
};

const BasicLayoutContent: FC = () => {
  const location = useLocation();
  const { message } = useAntdApp();

  // Zustand stores
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUser = useUserStore((state) => state.clearUser);
  const menus = useMenuStore((state) => state.menus);
  const clearMenus = useMenuStore((state) => state.clearMenus);
  const collapsed = useAppStore((state) => state.collapsed);
  const setCollapsed = useAppStore((state) => state.setCollapsed);
  const toggleCollapsed = useAppStore((state) => state.toggleCollapsed);

  const { refresh } = useModel('@@initialState');

  const { run: handleLogout, loading } = useRequest(logout, {
    manual: true,
    onSuccess: async () => {
      message.success('已退出登录');
      clearUser();
      clearMenus();
      await refresh();
      history.push('/login');
    }
  });

  // 从动态菜单生成顶部模块
  const topModules = useMemo(() => getTopModules(menus), [menus]);

  // 获取当前顶部模块
  const currentTopModule = topModules.find((m) =>
    location.pathname.startsWith(m.key)
  );
  const currentTopModuleKey =
    currentTopModule?.key || topModules[0]?.key || '/';

  // 获取当前模块的左侧菜单
  const siderMenuItems = useMemo(() => {
    // 跳过 redirect 项，找到有 routes 的模块
    const currentModule = menus.find(
      (m) => !m.redirect && m.routes && location.pathname.startsWith(m.path)
    );
    if (process.env.UMI_ENV === 'dev') {
      console.log('[Layout] menus:', menus, 'currentModule:', currentModule);
    }
    if (currentModule?.routes) {
      return menuToAntdItems(currentModule.routes);
    }
    return [];
  }, [menus, location.pathname]);

  // 判断是否显示左侧菜单
  const showSider = siderMenuItems && siderMenuItems.length > 0;
  if (process.env.UMI_ENV === 'dev') {
    console.log(
      '[Layout] siderMenuItems:',
      siderMenuItems,
      'showSider:',
      showSider
    );
  }

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

/**
 * BasicLayout 包裹 App 组件
 * 确保所有子组件可以使用 App.useApp() 获取 message/notification/modal
 */
const BasicLayout: FC = () => {
  return (
    <App>
      <AntdStaticHolder />
      <BasicLayoutContent />
    </App>
  );
};

export default BasicLayout;
