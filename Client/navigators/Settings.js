import { StackNavigator } from 'react-navigation';

import Settings from '../containers/Settings';
import { Colors } from '../consts';

const routeConfig = {
    Settings: {screen: Settings},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'},
        headerStyle: {backgroundColor: Colors.brandPrimaryColor}
    }
}

export const SettingsNavigator = StackNavigator(routeConfig, navConfig);