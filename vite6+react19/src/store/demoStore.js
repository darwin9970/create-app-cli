import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import generatePersistConfig from '@store/persistConfig.js';

const demoStore = createSlice({
    name: 'demoStore',
    initialState: {
        userId: '213213',
        userName: '张三'
    },
    reducers: {
        updateState(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

const persistConfig = generatePersistConfig();
persistConfig.key = 'demoStore'; //设置持久化储存的key

const demoStorePersist = persistReducer(persistConfig, demoStore.reducer);

export default demoStorePersist;
export const demoStoreAction = demoStore.actions;