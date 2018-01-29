import { StackNavigator } from 'react-navigation';

import Settings from '../containers/Settings';
import { Colors, Font } from '../consts';

const routeConfig = {
    Settings: {screen: Settings},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
}

export const SettingsNavigator = StackNavigator(routeConfig, navConfig);