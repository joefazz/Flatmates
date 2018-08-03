import { createStackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import House from '../containers/House';
import PostDetail from '../containers/Feed/PostDetail';
import UserProfile from '../containers/Feed/UserProfile';

const routeConfig = {
    House: { screen: House },
    PostDetail: { screen: PostDetail },
    UserProfile: { screen: UserProfile },

};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor }
    }
};

export const HouseNavigator = createStackNavigator(routeConfig, navConfig);
