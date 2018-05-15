import { createStackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import Settings from '../containers/Settings';

const routeConfig = {
    Settings: { screen: Settings }
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor }
    }
};

export const SettingsNavigator = createStackNavigator(routeConfig, navConfig);
