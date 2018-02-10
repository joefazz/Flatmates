import { StackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import Settings from '../containers/Settings';

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