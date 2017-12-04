import { StackNavigator } from 'react-navigation';

import Feed from '../containers/Feed';
import { Colors } from '../consts';

const routeConfig = {
    Feed: {screen: Feed},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'},
        headerStyle: {backgroundColor: Colors.brandPrimaryColor}
    }
}

export const FeedNavigator = StackNavigator(routeConfig, navConfig);