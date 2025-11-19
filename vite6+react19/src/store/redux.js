import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import demoStorePersist from '@/store/demoStore.js';

export const store = configureStore({
    reducer: {
        demoStore: demoStorePersist
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    }
});
export const persist = persistStore(store);