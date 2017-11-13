import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons'

export class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
        )
    }

    render() {
        return (
            <View>
                <Text>Chat Screen</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindAction = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindAction)(Chat)