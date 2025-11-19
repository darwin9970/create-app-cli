namespace Store {
    /**
     * @interface InitStore store接口
     * @template routerStore 路由store
     * */
    interface InitStore {
        demoStore: DemoStore.Store;
        routerStore: RouterStore.Store
    }
}
