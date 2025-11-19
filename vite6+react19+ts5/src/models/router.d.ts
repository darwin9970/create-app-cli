import React, { JSX } from 'react';

export declare global {
    namespace Router {
        interface RouteItem {
            path: string;
            element?: JSX.Element;
            component?: React.LazyExoticComponent<React.ComponentType<unknown>>;
            children?: Array<RouteItem>;
        }

        type Route = Array<RouteItem>


        interface RouteProp {
            theme: Record<string, string>;
        }
    }
}