import React from 'react';
import { StackNavigator, Header } from 'react-navigation';

import ChatList from '../containers/Chat/ChatList';
import ChatDetail from '../containers/Chat/ChatDetail';
import CreateGroup from '../containers/Chat/CreateGroup';
import EditGroup from '../containers/Chat/EditGroup';
import { Colors, Font } from '../consts';

const routeConfig = {
    ChatList: {screen: ChatList},
    ChatDetail: {screen: ChatDetail},
    CreateGroup: {screen: CreateGroup},
}

const navConfig = {
    navigationOptions: {
        headerTintColor: Colors.white,
        headerTitleStyle: {color: Colors.white, fontFamily: Font.FONT_FAMILY},
        headerStyle: {backgroundColor: Colors.brandSecondaryColor},
    }
}


export const ChatNavigator = StackNavigator(routeConfig, navConfig);