import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import KeepAlive from 'react-activation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import { store,persist } from '@store/redux.js';

const routes = [{
    path: '/',
    element: <Navigate to="/home" replace/>
}, {
    path: '/home',
    component: lazy(() => import('@pages/home/home.jsx'))
}];

const generateRouter = (routers,theme) => {
    return routers.map((item) => {
        if (item.children) {
            item.children = generateRouter(item.children);
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

const RootRouter = (props) => {
    return (useRoutes(generateRouter(routes, props.theme)));
};

export default RootRouter;