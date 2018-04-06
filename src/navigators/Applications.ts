import { StackNavigator } from 'react-navigation';

import { ApplicationList } from '../containers/Groups/Applications/ApplicationList';
import { ApplicationDetail } from '../containers/Groups/Applications/ApplicationDetail';

const routeConfig = {
    ApplicationsList: { screen: ApplicationList },
    ApplicationsDetail: { screen: ApplicationDetail }
};

const navConfig = {
    headerMode: 'none'
};

export const ApplicationNavigator = StackNavigator(routeConfig, navConfig);
