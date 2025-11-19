import sessionStorage from 'redux-persist/es/storage/session';

const generatePersistConfig = ()=> {
    return {
        key:'root',
        storage: sessionStorage,
        serialize: (data)=> {//自定义储存数据
            if (data['_persist']) {
                return JSON.stringify(data);
            } else {
                return data;
            }
        },
        deserialize: (data) => {
            try {
                return JSON.parse(data);
            } catch (e) {
                return data;
            }
        }
    };
};

export default generatePersistConfig;