// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { createDefaultLogger } from 'common/logging/default-logger';
import { Logger } from 'common/logging/logger';
import { BaseStore } from '../../common/base-store';
import { Store } from '../../common/flux/store';
import { StoreNames } from '../../common/stores/store-names';

export abstract class BaseStoreImpl<TState> extends Store implements BaseStore<TState> {
    private logger: Logger;
    private storeName: StoreNames;
    protected state: TState;

    constructor(storeName: StoreNames) {
        super();
        this.logger = createDefaultLogger(`${storeName}`);
        this.storeName = storeName;
        this.onGetCurrentState = this.onGetCurrentState.bind(this);
        this.addChangedListener(() => {
            this.logger.log('emitChanged()');
        });
    }

    public abstract getDefaultState(): TState;
    protected abstract addActionListeners(): void;

    public initialize(initialState?: TState): void {
        this.state = initialState || this.getDefaultState();

        this.addActionListeners();
    }

    public getId(): string {
        return StoreNames[this.storeName];
    }

    public getState(): TState {
        return this.state;
    }

    protected onGetCurrentState(): void {
        this.emitChanged();
    }
}
