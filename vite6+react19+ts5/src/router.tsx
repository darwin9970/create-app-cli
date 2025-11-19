import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import KeepAlive from 'react-activation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store, persist } from '@store/redux.ts';

const routes: Router.Route = [{
    path: '/',
    element: <Navigate to="/home" replace/>
}, {
    path: '/home',
    component: lazy(() => import('@pages/home/home.tsx'))
}];

const generateRouter = (routers: Router.Route, theme: Record<string, string>) => {
    return routers.map((item: Router.RouteItem) => {
        if (item.children) {
            item.children = generateRouter(item.children,theme);
        }
        const Component = item.component; // 将组件提取为变量
        item.element = <KeepAlive cacheKey={item.path} id={item.path} name={item.path}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ConfigProvider theme={{ token:theme }}>
                            {Component ? <Component/> : item.element}
                        </ConfigProvider>
                    </Suspense>
                </PersistGate>
            </Provider>
        </KeepAlive>;
        return item;
    });
};

const RootRouter = (props:Router.RouteProp) => {
    return (useRoutes(generateRouter(routes, props.theme)));
};

export default RootRouter;