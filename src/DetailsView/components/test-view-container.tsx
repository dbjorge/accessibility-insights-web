// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { ScanIncompleteWarningId } from 'common/types/scan-incomplete-warnings';
import { DetailsViewSwitcherNavConfiguration } from 'DetailsView/components/details-view-switcher-nav';
import { ISelection } from 'office-ui-fabric-react';
import * as React from 'react';

import { ScanMetadata } from 'common/types/store-data/unified-data-interface';
import { VisualizationConfigurationFactory } from '../../common/configs/visualization-configuration-factory';
import { NamedFC } from '../../common/react/named-fc';
import { AssessmentStoreData } from '../../common/types/store-data/assessment-result-data';
import { CardsViewModel } from '../../common/types/store-data/card-view-model';
import { FeatureFlagStoreData } from '../../common/types/store-data/feature-flag-store-data';
import { PathSnippetStoreData } from '../../common/types/store-data/path-snippet-store-data';
import { TabStoreData } from '../../common/types/store-data/tab-store-data';
import { UserConfigurationStoreData } from '../../common/types/store-data/user-configuration-store';
import { VisualizationScanResultData } from '../../common/types/store-data/visualization-scan-result-data';
import { VisualizationStoreData } from '../../common/types/store-data/visualization-store-data';
import { VisualizationType } from '../../common/types/visualization-type';
import { DetailsViewActionMessageCreator } from '../actions/details-view-action-message-creator';
import { AssessmentInstanceTableHandler } from '../handlers/assessment-instance-table-handler';
import { DetailsViewToggleClickHandlerFactory } from '../handlers/details-view-toggle-click-handler-factory';
import { IssuesTableHandler } from './issues-table-handler';
import { OverviewContainerDeps } from './overview-content/overview-content-container';
import { TestViewDeps } from './test-view';
import { AdhocIssuesTestView } from './adhoc-issues-test-view';
import { AdhocStaticTestView } from './adhoc-static-test-view';
import { AssessmentTestView } from './assessment-test-view';
import { FailedInstancesSection } from 'common/components/cards/failed-instances-section';
import { NeedsReviewInstancesSection } from 'common/components/cards/needs-review-instances-section';

export type TestViewContainerDeps = {
    detailsViewActionMessageCreator: DetailsViewActionMessageCreator;
} & TestViewDeps &
    OverviewContainerDeps;

export interface TestViewContainerProps {
    deps: TestViewContainerDeps;
    tabStoreData: TabStoreData;
    assessmentStoreData: AssessmentStoreData;
    featureFlagStoreData: FeatureFlagStoreData;
    pathSnippetStoreData: PathSnippetStoreData;
    selectedTest: VisualizationType;
    visualizationStoreData: VisualizationStoreData;
    visualizationScanResultData: VisualizationScanResultData;
    visualizationConfigurationFactory: VisualizationConfigurationFactory;
    clickHandlerFactory: DetailsViewToggleClickHandlerFactory;
    assessmentInstanceTableHandler: AssessmentInstanceTableHandler;
    issuesSelection: ISelection;
    issuesTableHandler: IssuesTableHandler;
    userConfigurationStoreData: UserConfigurationStoreData;
    scanMetadata: ScanMetadata;
    cardsViewData: CardsViewModel;
    switcherNavConfiguration: DetailsViewSwitcherNavConfiguration;
    scanIncompleteWarnings: ScanIncompleteWarningId[];
}

export const TestViewContainer = NamedFC<TestViewContainerProps>('TestViewContainer', props => {
    const configuration = props.visualizationConfigurationFactory.getConfiguration(
        props.selectedTest,
    );
    const testViewProps = { configuration, ...props };

    switch (configuration.testViewType) {
        case 'AdhocStatic':
            return <AdhocStaticTestView {...testViewProps} />;
        case 'AdhocFailure':
            return (
                <AdhocIssuesTestView instancesSection={FailedInstancesSection} {...testViewProps} />
            );
        case 'AdhocNeedsReview':
            return (
                <AdhocIssuesTestView
                    instancesSection={NeedsReviewInstancesSection}
                    {...testViewProps}
                />
            );
        case 'Assessment':
            return <AssessmentTestView {...testViewProps} />;
    }
});
