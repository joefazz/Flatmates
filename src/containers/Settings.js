import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';

type Props = {

};

type State = {

};

export class Settings extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Settings',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-settings' : 'ios-settings-outline' : 'md-settings'} color={tintColor} size={29} />
        )
    }
    render() {
        return (
            <View>
                <StatusBar barStyle={'light-content'} />
                <Text>Settings Screen</Text>
            </View>
        );
    }
}

const mapStateToProps = () => ({
    
});

const bindActions = () => {
    return {
        
    };
};

export default connect(mapStateToProps, bindActions)(Settings);
