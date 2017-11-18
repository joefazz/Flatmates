import React from 'react';
import { StackNavigator, Header } from 'react-navigation';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo';

import Chat from '../containers/Chat';
import { base } from '../styles';
import { Colors } from '../consts';

const routeConfig = {
    ChatList: {screen: Chat},
}

const navConfig = {
    navigationOptions: {
        header: props => <GradientHeader {...props} />,        
        headerTitleStyle: {color: 'white'},
        headerStyle: {backgroundColor: 'transparent'}
    }
}

const GradientHeader = props => (
    <View style={{ backgroundColor: 'yellow'}}>
        <LinearGradient 
            colors={[Colors.gradientStart, Colors.gradientStop]}
            start={[0, 0]}
            end={[1, 1]}
            style={{...base.absoluteFill}} />
        <Header {...props} />
    </View>
);


export const ChatNavigator = StackNavigator(routeConfig, navConfig);