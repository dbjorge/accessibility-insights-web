// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { createDefaultLogger } from 'common/logging/default-logger';
import { initializeFabricIcons } from '../common/fabric-icons';
import { MainWindowInitializer } from './main-window-initializer';
import { WindowInitializer } from './window-initializer';

const logger = createDefaultLogger('Accessibility Insights client-init');

if (window.windowInitializer) {
    logger.log('skipping initialization (already done)');
} else {
    logger.log('starting initialization');

    initializeFabricIcons();

    if (window.top === window) {
        window.windowInitializer = new MainWindowInitializer();
    } else {
        window.windowInitializer = new WindowInitializer();
    }

    window.windowInitializer
        .initialize()
        .then(() => logger.log('finished initialization'))
        .catch(e => logger.error(`error initializing injected code: ${e}`));
}
