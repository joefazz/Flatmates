import { StackNavigator } from 'react-navigation';

import Login from '../containers/Login';
import { HomeNavigator } from './Home';

const routesConfig = {
    Login: { screen: Login },
    Home: { screen: HomeNavigator }
};

const navConfig = {
    headerMode: 'none',
    initialRoute: 'Home',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const RootNavigator = StackNavigator(routesConfig, navConfig);

export default RootNavigator;