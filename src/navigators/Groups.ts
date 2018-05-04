import { TabNavigator, TabBarTop } from 'react-navigation';

import { ChatNavigator } from './Chat';
import { ApplicationNavigator } from './Applications';
import { Colors, Font } from '../consts';

const routeConfig = {
    ChatNavigator: { screen: ChatNavigator },
    ApplicationNavigator: { screen: ApplicationNavigator }
};

const navConfig = {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.textGrey,
        style: { backgroundColor: Colors.offWhite },
        pressColor: Colors.definetelyNotAirbnbRed,
        indicatorStyle: { backgroundColor: Colors.brandPrimaryColor },
        labelStyle: { ...Font.FontFactory({ weight: 'Bold' }) }
    }
};

export const GroupNavigator = TabNavigator(routeConfig, navConfig);
