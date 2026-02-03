import { EventBus } from '@framework/EventBus.ts';
import type Block from '@framework/Block.ts';
import { cloneDeep, isEquals } from '@utils/ObjectUtils';
import type { StoreStateObject } from '@/types/store-state-object';

export class Store extends EventBus {
    public static Events = {
        Update: 'Update'
    };

    private static __instance: Store;
    private state: StoreStateObject = {};

    constructor(initialState: StoreStateObject) {
        if (Store.__instance)
            return Store.__instance;
        super();

        this.on(Store.Events.Update, () => {});

        this.set(initialState);

        Store.__instance = this;
    }

    private merge(lhs: StoreStateObject, rhs: StoreStateObject): StoreStateObject {
        for (let p in rhs) {
            if (!rhs.hasOwnProperty(p)) {
                continue;
            }

            try {
                if (rhs[p].constructor === Object) {
                    rhs[p] = this.merge(lhs[p] as StoreStateObject, rhs[p] as StoreStateObject);
                } else {
                    lhs[p] = rhs[p];
                }
            } catch(e) {
                lhs[p] = rhs[p];
            }
        }

        return lhs;
    }

    public get() {
        return cloneDeep(this.state);
    }

    public set(newState: StoreStateObject) {
        const prevState = { ...this.state };
        this.state = this.merge(this.state, newState);
        this.emit(Store.Events.Update, prevState, this.state);
    }

    public setValue(key: string, newState: StoreStateObject) {
        const newStateValue = key.split('.').reduceRight((acc, key) => ({
            [key]: acc
        }), newState);
        this.set(newStateValue);
    }
}

export function connect(stateToPropsFunc: (state: StoreStateObject) => StoreStateObject) {
    return function (Component: typeof Block) {
        return class extends Component {
            private onStoreChangeCallback: () => StoreStateObject;

            constructor(props: BlockProps) {
                const store = window.store;
                let state = stateToPropsFunc(store.get());
                super({ ...props, ...state });

                this.onStoreChangeCallback = () => {
                    const newState = stateToPropsFunc(store.get());
                    if (!isEquals(state, newState)) {
                        this.setConnectedProps({ ...newState });
                    }

                    state = newState;
                    return newState;
                };

                store.on(Store.Events.Update, this.onStoreChangeCallback);
            }
        };
    };
}
