import { createSwitchNavigator } from 'react-navigation';

import AuthLoading from '../containers/AuthLoading';
import { HomeNavigator } from './Home';
import { LoginNavigator } from './Login';

const routesConfig = {
    AuthLoading: { screen: AuthLoading },
    Login: { screen: LoginNavigator },
    Home: { screen: HomeNavigator }
};

const navConfig = {
    headerMode: 'none',
    initialRouteName: 'AuthLoading',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const RootNavigator = createSwitchNavigator(routesConfig, navConfig);

export default RootNavigator;
