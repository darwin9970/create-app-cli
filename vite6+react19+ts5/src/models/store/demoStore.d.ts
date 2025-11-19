import { PayloadAction, Slice } from '@reduxjs/toolkit';

export declare global {
    namespace DemoStore {
        interface State {
            userId: string;
            userName: string;
        }

        type Action = PayloadAction<Partial<State>>

        interface Reducers {
            updateState: (state: State, action: Action) => State;
        }

        type Store = Slice<State, Reducers>
    }
}