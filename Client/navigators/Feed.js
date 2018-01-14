import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import PostList from '../containers/Feed/PostList';
import PostDetail from '../containers/Feed/PostDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    PostList: { screen: PostList },    
    PostDetail: { screen: PostDetail },    
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
        headerMode: Platform.OS === 'android' ? 'none' : 'float'
    }
}

export const FeedNavigator = StackNavigator(routeConfig, navConfig);