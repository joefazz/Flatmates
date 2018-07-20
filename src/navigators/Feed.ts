import { createStackNavigator } from 'react-navigation';

import { MapComponent } from '../components/Map/MapComponent';
import { Colors, Font } from '../consts';
import CreatePost from '../containers/Feed/CreatePost';
import PostDetail from '../containers/Feed/PostDetail';
import PostList from '../containers/Feed/PostList';
import UserProfile from '../containers/Feed/UserProfile';
import { About } from '../containers/About';

const routeConfig = {
    PostList: { screen: PostList },
    PostDetail: { screen: PostDetail },
    CreatePost: { screen: CreatePost },
    UserProfile: { screen: UserProfile },
    MapView: { screen: MapComponent },
    About: { screen: About }
};

const navConfig: any = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: { color: Colors.white, ...Font.FontFactory({ family: 'Nunito' }) },
        headerStyle: { backgroundColor: Colors.brandPrimaryColor },
        headerBackTitle: 'Home'
    }
};

export const FeedNavigator = createStackNavigator(routeConfig, navConfig);
