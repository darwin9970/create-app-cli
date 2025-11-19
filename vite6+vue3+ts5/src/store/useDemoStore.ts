import { defineStore } from 'pinia';


const demoStore: DemoStore.Store = defineStore('demoStore', {
    state: (): Partial<DemoStore.State> => ({
        userId: '213213',
        userName: '张三'
    }),
    actions: {
        updateState(info: Partial<DemoStore.State>): void {
            this.$state = {
                ...this.$state,
                ...info
            };
        }
    },
    persist: { //pinia持久化配置，默认sessionStorage
        enabled: true
    }
});

export default demoStore;

