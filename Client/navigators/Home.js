import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import { ProfileNavigator } from './Profile';
import { FeedNavigator } from './Feed';
import { ChatNavigator } from './Chat';
import { SettingsNavigator } from './Settings';
import { Colors } from '../consts';

const routeConfig = {
    Feed: { screen: FeedNavigator },    
    Profile: {screen: ProfileNavigator },
    Chat: { screen: ChatNavigator },
    Settings: { screen: SettingsNavigator }
};

const navConfig = {
    swipeEnabled: Platform.OS === 'ios' ? false : true,
    animationEnabled: true,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Colors.brandSecondaryColor,
        inactiveTintColor: Colors.grey,
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