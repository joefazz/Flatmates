import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import {Profile} from '../containers/Profile';
import {Feed} from '../containers/Feed';
import {Chat} from '../containers/Chat';
import {Settings} from '../containers/Settings';

const routeConfig = {
    Feed: { screen: Feed },    
    Profile: {screen: Profile },
    Chat: { screen: Chat },
    Settings: { screen: Settings }
};

const navConfig = {
    swipeEnabled: Platform.OS === 'ios' ? false : true,
    animationEnabled: false,
    lazy: true
};

export const HomeNavigator = TabNavigator(routeConfig, navConfig);