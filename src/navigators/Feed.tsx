import * as React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PostList from '../containers/Feed/PostList';
import PostDetail from '../containers/Feed/PostDetail';
import CreatePost from '../containers/Feed/CreatePost';
import { Colors, Font } from '../consts';

const routeConfig = {
    PostList: {screen: PostList},
    PostDetail: {screen: PostDetail},
    CreatePost: {screen: CreatePost}
};

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        ),
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
};


export const FeedNavigator = StackNavigator(routeConfig, navConfig);