import { StackNavigator } from 'react-navigation';

import ApplicationList from '../containers/Groups/Applications/ApplicationList';
import ApplicationDetail from '../containers/Groups/Applications/ApplicationDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    ApplicationsList: { screen: ApplicationList },
    ApplicationDetail: { screen: ApplicationDetail }
};

const navConfig: any = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor, paddingTop: 0 }
    }
};

export const ApplicationNavigator = StackNavigator(routeConfig, navConfig);
