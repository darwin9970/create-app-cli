import { PersistOptions } from 'pinia-plugin-persist';

declare module 'pinia' {
    interface DefineStoreOptionsBase<S, Store> {
        persist?: PersistOptions;
    }
}