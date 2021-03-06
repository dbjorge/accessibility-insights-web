// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ScanningSpinner } from 'common/components/scanning-spinner/scanning-spinner';
import { NamedFC } from 'common/react/named-fc';
import { CardsViewModel } from 'common/types/store-data/card-view-model';
import { ScanMetadata } from 'common/types/store-data/unified-data-interface';
import { UserConfigurationStoreData } from 'common/types/store-data/user-configuration-store';
import { CardsView, CardsViewDeps } from 'DetailsView/components/cards-view';
import { ScanStatus } from 'electron/flux/types/scan-status';
import { ContentPageInfo } from 'electron/types/content-page-info';
import { HeaderSection } from 'electron/views/automated-checks/components/header-section';
import * as React from 'react';

export type TestViewDeps = {} & CardsViewDeps;
export type TestViewProps = {
    deps: TestViewDeps;
    scanStatus: ScanStatus;
    scanMetadata: ScanMetadata;
    cardsViewData: CardsViewModel;
    userConfigurationStoreData: UserConfigurationStoreData;
    contentPageInfo: ContentPageInfo;
};

export const TestView = NamedFC<TestViewProps>('TestView', props => {
    const {
        scanStatus,
        scanMetadata,
        cardsViewData,
        userConfigurationStoreData,
        deps,
        contentPageInfo,
    } = props;

    if (scanStatus !== ScanStatus.Completed) {
        return (
            <>
                <HeaderSection contentPageInfo={contentPageInfo} />
                <ScanningSpinner
                    isSpinning={scanStatus === ScanStatus.Scanning}
                    label="Scanning..."
                    aria-live="assertive"
                />
            </>
        );
    }

    return (
        <>
            <HeaderSection contentPageInfo={contentPageInfo} />
            <CardsView
                deps={deps}
                scanMetadata={scanMetadata}
                userConfigurationStoreData={userConfigurationStoreData}
                cardsViewData={cardsViewData}
            />
        </>
    );
});
