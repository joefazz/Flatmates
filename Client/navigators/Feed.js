import { StackNavigator } from 'react-navigation';

import Feed from '../containers/Feed';
import { Colors } from '../consts';

const routeConfig = {
    Feed: {screen: Feed},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.brandSecondaryColor,
        headerTitleStyle: {color: Colors.brandSecondaryColor},
    }
}

export const FeedNavigator = StackNavigator(routeConfig, navConfig);