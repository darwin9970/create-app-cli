namespace DemoStore {
    import { StoreDefinition } from 'pinia';

    interface State {
        userId: string;
        userName: string;
    }

    interface Action {
        updateState: (info: Partial<Store>) => void;
    }

    type Store = StoreDefinition<'demoStore', State, Record<string, never>, Action>
}