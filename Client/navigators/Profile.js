import { StackNavigator } from 'react-navigation';

import Profile from '../containers/Profile';
import { Colors } from '../consts';

const routeConfig = {
    Profile: {screen: Profile},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.brandSecondaryColor,
        headerTitleStyle: {color: Colors.brandSecondaryColor},
    }
}

export const ProfileNavigator = StackNavigator(routeConfig, navConfig);