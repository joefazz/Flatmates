import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

import { base, profile } from '../styles';
import { FloatingActionButton } from '../widgets/FloatingActionButton';
import { EditButton } from '../widgets/EditButton';

export class Profile extends React.Component {
    static navigationOptions = {
        
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight: Platform.OS === 'ios' ? <EditButton onPress={() => navigation.navigate('EditProfile')} /> : null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-person' : 'ios-person-outline' : 'md-person'} color={tintColor} size={32} />
        )
    })

    render() {
        return (
            <View style={ base.content }>
                <StatusBar barStyle={'light-content'} />
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
                <FloatingActionButton iconName={'edit'} />
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