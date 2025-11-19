import { defineStore } from 'pinia';

const useDemoStore = defineStore('useDemoStore', {
    state: () => ({
        userId: '213213',
        userName: '张三'
    }),
    actions: { //actions是store的方法methods
        updateState(info){
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

export default useDemoStore;