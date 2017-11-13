import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

export class Feed extends React.Component {
    static navigationOptions = {
        title: 'Feed',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-pulse' : 'ios-pulse-outline'} color={tintColor} size={32} />
        )
    };

    render() {
        return (
            <View>
                <Text>Feed Screen</Text>
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

export default connect(mapStateToProps, bindAction)(Feed)