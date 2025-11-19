import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import demoStorePersist from '@store/demoStore.ts';

export const store:EnhancedStore = configureStore({
    reducer: {
        demoStore: demoStorePersist
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    }
});
export const persist = persistStore(store);