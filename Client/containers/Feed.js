import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

export class Feed extends React.Component {
    static navigationOptions = {
        title: 'Feed',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={focused ? 'ios-pulse' : 'ios-pulse-outline'} color={tintColor} size={32} />
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

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(Feed)