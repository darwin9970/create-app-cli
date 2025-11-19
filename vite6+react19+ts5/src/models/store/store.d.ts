import { PersistConfig as _PersistConfig, PersistState as _PersistState } from 'redux-persist';

export declare global {
    namespace Store {

        type PersistState<S> = S & { _persist: _PersistState;};

        interface PersistConfig<S> extends _PersistConfig<PersistState<S>> {
            serialize: (data: keyof PersistState<S> | PersistState<S>) => string | typeof data;
            deserialize: (data: string | keyof PersistState<S>) => PersistState<S> | typeof data;
        }

        interface State {
            demoStore: DemoStore.State;
        }
    }
}
