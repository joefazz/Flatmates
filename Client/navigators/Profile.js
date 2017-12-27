import { StackNavigator } from 'react-navigation';

import Profile from '../containers/Profile';
import { Colors } from '../consts';

const routeConfig = {
    Profile: {screen: Profile},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
}

export const ProfileNavigator = StackNavigator(routeConfig, navConfig);