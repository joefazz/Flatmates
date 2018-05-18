import { createStackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import House from '../containers/House';

const routeConfig = {
    House: { screen: House }
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor }
    }
};

export const HouseNavigator = createStackNavigator(routeConfig, navConfig);
