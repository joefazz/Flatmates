import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Text } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { base, profile } from '../styles';

export class Profile extends React.Component {
    static navigationOptions = {
        
    }
    static navigationOptions = {
        title: 'Profile',

        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-person' : 'ios-person-outline'} color={tintColor} size={32} />
        )
    }
    render() {
        return (
            <View style={ base.content }>
                <View style={ profile.avatarWrapper }>
                    <Avatar 
                        xlarge={true} 
                        rounded={true} 
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}} />

                    <Text h3>Joe Fazzino</Text>
                </View>
                <View style={ profile.preferencesWrapper }>
                    <Text>Sort your preferences from most important to least important</Text> 
                </View>
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