import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons'

import { ChatListComponent } from '../../components/Chat/ListComponent';
import { USER_QUERY } from '../../queries/User';

export class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
        )
    }

    render() {
        return (
            <ChatListComponent navigation={this.props.navigation} data={this.props.data} />
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const bindActions = (dispatch) => {
    return {
        
    };
};

const userQuery = graphql(USER_QUERY, {
    options: () => ({ variables: { id: 1 } }),
    props: ({ data }) => ({
        data
    }),
});

export default compose(
    userQuery,
    connect(mapStateToProps, bindActions),
)(ChatList)