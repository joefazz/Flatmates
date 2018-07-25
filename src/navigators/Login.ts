import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login';
import { FeedNavigator } from './Feed';

const routeConfig = {
    Login: { screen: Login },
    Feed: { screen: FeedNavigator }
};

const navConfig = {
    navigationOptions: {
        header: null
    }
};

export const LoginNavigator = createStackNavigator(routeConfig, navConfig);
