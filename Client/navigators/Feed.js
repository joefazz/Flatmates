import React from 'react';
import { StackNavigator, Header } from 'react-navigation';

import PostList from '../containers/Feed/PostList';
import PostDetail from '../containers/Feed/PostDetail';
import { Colors, Font } from '../consts';

const routeConfig = {
    PostList: {screen: PostList},
    PostDetail: {screen: PostDetail},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, ...Font.FontFactory({ family: 'Nunito' })},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
}


export const FeedNavigator = StackNavigator(routeConfig, navConfig);