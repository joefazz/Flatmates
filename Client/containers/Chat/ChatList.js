import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons'

import { ChatListComponent } from '../../components/Chat/ListComponent';

export const DATA = _.times(50, i => ({
    id: i,
    name: 'Group ' + i,
}));

export class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
        )
    }

    render() {
        return (
            <ChatListComponent data={DATA} navigation={this.props.navigation} />
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(ChatList)