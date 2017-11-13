import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

export class Settings extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-settings' : 'ios-settings-outline'} color={tintColor} size={32} />
        )
    }
    render() {
        return (
            <View>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(Settings)