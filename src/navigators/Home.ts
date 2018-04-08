import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import { FeedNavigator } from './Feed';
import { ProfileNavigator } from './Profile';
import { SettingsNavigator } from './Settings';
import { GroupNavigator } from './Groups';

const routeConfig = {
    Feed: { screen: FeedNavigator },
    Profile: { screen: ProfileNavigator },
    Group: { screen: GroupNavigator },
    Settings: { screen: SettingsNavigator }
};

const navConfig = {
    swipeEnabled: false,
    animationEnabled: Platform.OS === 'android' ? true : false,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Colors.brandPrimaryColor,
        inactiveTintColor: Colors.grey,
        showLabel: false,
        labelStyle: { ...Font.FontFactory({ family: 'Nunito' }) },
        ...Platform.select({
            android: {
                showLabel: false,
                showIcon: true,
                style: {
                    backgroundColor: Colors.white
                },
                indicatorStyle: {
                    backgroundColor: Colors.brandPrimaryColor
                },
                pressColor: Colors.brandPrimaryColor
            }
        })
    }
};

export const HomeNavigator = TabNavigator(routeConfig, navConfig);
