import { StackNavigator } from 'react-navigation';

import Profile from '../containers/Profile';

const routeConfig = {
    Profile: {screen: Profile},
}

export const ProfileNavigator = StackNavigator(routeConfig);