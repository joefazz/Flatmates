import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash';

import { ChatListComponent } from '../../components/Chat/ListComponent';
import { USER_QUERY } from '../../graphql/queries';

export class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
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
    options: () => ({ variables: { id: 'cjaqu2gggbhd00154wnhzhjku' } }),
    props: ({ data }) => ({
        data
    }),
});

export default compose(
    userQuery,
    connect(mapStateToProps, bindActions),
)(ChatList)