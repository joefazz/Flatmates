import { TabNavigator, TabBarTop, StackNavigator } from 'react-navigation';

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
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.textGrey,
        style: { backgroundColor: Colors.offWhite },
        pressColor: Colors.definetelyNotAirbnbRed,
        indicatorStyle: { backgroundColor: Colors.brandPrimaryColor },
        labelStyle: { ...Font.FontFactory({ weight: 'Bold' }) }
    }
};

const stackConfig = {
    navigationOptions: {
        title: 'Group',
        headerStyle: {
            height: 0,
            backgroundColor: Colors.brandPrimaryColor,
            borderBottomWidth: 0
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) }
    }
};

export const GroupNavigator = StackNavigator(
    { root: TabNavigator(routeConfig, navConfig) },
    stackConfig
);
