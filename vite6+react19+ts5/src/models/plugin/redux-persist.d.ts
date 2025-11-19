declare module 'redux-persist/es/persistReducer' {
    import { Action, Reducer } from 'redux';
    import { PersistState } from 'redux-persist/es/types';

    interface PersistPartial {
        _persist: PersistState;
    }

    export default function persistReducer<S, A extends Action = Action>(config: Store.PersistConfig<S>, baseReducer: Reducer<S, A>): Reducer<S & PersistPartial, A>;
}