import { StackNavigator } from 'react-navigation';

import Login from '../containers/Login';
import { HomeNavigator } from './Home';

const routesConfig = {
    Home: { screen: HomeNavigator }
    Login: { screen: Login },
};

const navConfig = {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const RootNavigator = StackNavigator(routesConfig, navConfig);

export default RootNavigator;