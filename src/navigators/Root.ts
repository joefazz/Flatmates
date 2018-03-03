import { SwitchNavigator } from 'react-navigation';

import AuthLoading from '../containers/AuthLoading';
import Login from '../containers/Login';
import { HomeNavigator } from './Home';

const routesConfig = {
    AuthLoading: { screen: AuthLoading },
    Login: { screen: Login },
    Home: { screen: HomeNavigator }
};

const navConfig = {
    headerMode: 'none',
    initialRouteName: 'AuthLoading',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const RootNavigator = SwitchNavigator(routesConfig, navConfig);

export default RootNavigator;