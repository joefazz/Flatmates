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
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        activeTintColor: Colors.brandTertiaryColor,
        inactiveTintColor: Colors.grey
    }
};

export const HomeNavigator = TabNavigator(routeConfig, navConfig);