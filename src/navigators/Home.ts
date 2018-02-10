import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import { ChatNavigator } from './Chat';
import { FeedNavigator } from './Feed';
import { ProfileNavigator } from './Profile';
import { SettingsNavigator } from './Settings';

const routeConfig = {
    Feed: { screen: FeedNavigator },
    Profile: {screen: ProfileNavigator },
    Chat: { screen: ChatNavigator },
    Settings: { screen: SettingsNavigator }
};

const navConfig = {
    swipeEnabled: false,
    animationEnabled: Platform.OS === 'android' ? true : false,
    lazy: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Colors.brandSecondaryColor,
        inactiveTintColor: Colors.grey,
        labelStyle: { ...Font.FontFactory({ family: 'Nunito' }) },
        ...Platform.select({
            android: {
                showLabel: false,
                showIcon: true,
                style: {
                    backgroundColor: Colors.white
                },
                indicatorStyle: {
                    backgroundColor: Colors.brandSecondaryColor
                },
                pressColor: Colors.brandSecondaryColor,
            }
        })
    }
};

export const HomeNavigator = TabNavigator(routeConfig, navConfig);