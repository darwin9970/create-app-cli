import sessionStorage from 'redux-persist/es/storage/session';

const generatePersistConfig = <S>(): Store.PersistConfig<S> => {
    return {
        key:'root',
        storage: sessionStorage,
        serialize: (data: keyof Store.PersistState<S> | Store.PersistState<S>): string | typeof data => {//自定义储存数据
            if ((data as Store.PersistState<S>)['_persist']) {
                return JSON.stringify(data);
            } else {
                return data;
            }
        },
        deserialize: (data:keyof Store.PersistState<S> | string):Store.PersistState<S> | typeof data => {
            try {
                return JSON.parse(data as string);
            } catch (e) {
                return data;
            }
        }
    };
};

export default generatePersistConfig;