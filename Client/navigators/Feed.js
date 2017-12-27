import { StackNavigator } from 'react-navigation';

import Feed from '../containers/Feed';
import { Colors } from '../consts';
import { Platform } from 'react-native';

const routeConfig = {
    Feed: {screen: Feed},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
        headerMode: Platform.OS === 'android' ? 'none' : 'float'
    }
}

export const FeedNavigator = StackNavigator(routeConfig, navConfig);