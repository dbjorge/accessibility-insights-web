// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { createDefaultLogger } from 'common/logging/default-logger';
import { InterpreterMessage, PayloadCallback } from '../common/message';
import { DictionaryStringTo } from '../types/common-types';

export class Interpreter {
    private logger = createDefaultLogger();

    protected messageToActionMapping: DictionaryStringTo<PayloadCallback<any>> = {};

    public registerTypeToPayloadCallback = <Payload>(
        messageType: string,
        callback: PayloadCallback<Payload>,
    ): void => {
        this.messageToActionMapping[messageType] = callback;
    };

    public interpret(message: InterpreterMessage): boolean {
        const tabDescriptor = message.tabId == null ? 'global' : `tab ${message.tabId}`;
        this.logger.log(`[Interpreter (${tabDescriptor})] ${message.messageType}`);

        if (this.messageToActionMapping[message.messageType]) {
            this.messageToActionMapping[message.messageType](message.payload, message.tabId);
            return true;
        }
        return false;
    }
}
