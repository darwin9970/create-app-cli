import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';
import generatePersistConfig from '@store/persistConfig.ts';

const demoStore: DemoStore.Store = createSlice({
    name: 'demoStore',
    initialState: {
        userId: '213213',
        userName: '张三'
    },
    reducers: {
        updateState(state: DemoStore.State, action: DemoStore.Action): DemoStore.State {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

const persistConfig: Store.PersistConfig<DemoStore.State> = generatePersistConfig();
persistConfig.key = 'demoStore'; //设置持久化储存的key


const demoStorePersist: Reducer = persistReducer(persistConfig, demoStore.reducer);

export default demoStorePersist;
export const demoStoreAction: typeof demoStore.actions = demoStore.actions;