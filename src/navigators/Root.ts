import { SwitchNavigator } from 'react-navigation';

import Login from '../containers/Login';
import { HomeNavigator } from './Home';

const routesConfig = {
    Login: { screen: Login },
    Home: { screen: HomeNavigator }
};

const navConfig = {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const RootNavigator = SwitchNavigator(routesConfig, navConfig);

export default RootNavigator;