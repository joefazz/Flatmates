import { StackNavigator } from 'react-navigation';

import Settings from '../containers/Settings';
import { Colors } from '../consts';

const routeConfig = {
    Settings: {screen: Settings},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.brandSecondaryColor,
        headerTitleStyle: {color: Colors.brandSecondaryColor},
    }
}

export const SettingsNavigator = StackNavigator(routeConfig, navConfig);