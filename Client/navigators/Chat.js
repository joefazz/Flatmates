import React from 'react';
import { StackNavigator, Header } from 'react-navigation';

import ChatList from '../containers/Chat/ChatList';
import ChatDetail from '../containers/Chat/ChatDetail';
import { Colors } from '../consts';

const routeConfig = {
    ChatList: {screen: ChatList},
    ChatDetail: {screen: ChatDetail}
}

const navConfig = {
    navigationOptions: {
        headerTintColor: 'white',
        headerTitleStyle: {color: 'white'},
        headerStyle: {backgroundColor: Colors.brandPrimaryColor}
    }
}


export const ChatNavigator = StackNavigator(routeConfig, navConfig);