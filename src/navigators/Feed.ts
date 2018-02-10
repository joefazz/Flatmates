import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import { Colors, Font } from '../consts';
import CreatePost from '../containers/Feed/CreatePost';
import PostDetail from '../containers/Feed/PostDetail';
import PostList from '../containers/Feed/PostList';

const routeConfig = {
    PostList: {screen: PostList},
    PostDetail: {screen: PostDetail},
    CreatePost: {screen: CreatePost}
};

const navConfig: any = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor}
    }
};

export const FeedNavigator = StackNavigator(routeConfig, navConfig);