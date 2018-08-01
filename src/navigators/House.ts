import { createStackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import House from '../containers/House';
import PostDetail from '../containers/Feed/PostDetail';

const routeConfig = {
    House: { screen: House },
    PostDetail: { screen: PostDetail }
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor }
    }
};

export const HouseNavigator = createStackNavigator(routeConfig, navConfig);
