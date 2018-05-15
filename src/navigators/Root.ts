import { createSwitchNavigator } from 'react-navigation';

import AuthLoading from '../containers/AuthLoading';
import Login from '../containers/Login';
import { HomeNavigator } from './Home';
import { FeedNavigator } from './Feed';

const routesConfig = {
    AuthLoading: { screen: AuthLoading },
    Login: { screen: Login },
    ReadOnly: { screen: FeedNavigator },
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
