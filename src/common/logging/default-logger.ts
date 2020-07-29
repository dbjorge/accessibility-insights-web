// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Logger } from './logger';

export const createDefaultLogger = (tag?: string): Logger => {
    const prefix = tag == null ? '' : `[${tag}] `;
    return {
        log: (message?: any, ...optionalParams: any[]) => {
            console.log(prefix + message, ...optionalParams);
        },
        error: (message?: any, ...optionalParams: any[]) => {
            console.error(prefix + message, ...optionalParams);
        },
    };
};
