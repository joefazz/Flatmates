import { StackNavigator } from 'react-navigation';

import Settings from '../containers/Settings';

const routeConfig = {
    Settings: {screen: Settings},
}

export const SettingsNavigator = StackNavigator(routeConfig);