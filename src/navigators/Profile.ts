import { StackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import Profile from '../containers/Profile';

const routeConfig = {
    Profile: {screen: Profile},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
}

export const ProfileNavigator = StackNavigator(routeConfig, navConfig);