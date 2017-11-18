import { StackNavigator } from 'react-navigation';

import Profile from '../containers/Profile';
import { Colors } from '../consts';

const routeConfig = {
    Profile: {screen: Profile},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'},
        headerStyle: {backgroundColor: Colors.brandPrimaryColor}
    }
}

export const ProfileNavigator = StackNavigator(routeConfig, navConfig);