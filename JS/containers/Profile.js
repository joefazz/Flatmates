import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

export class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-person' : 'ios-person-outline'} color={tintColor} size={32} />
        )
    }
    render() {
        return (
            <View>
                <Text>Profile Screen</Text>
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

export default connect(mapStateToProps, bindActions)(Profile)