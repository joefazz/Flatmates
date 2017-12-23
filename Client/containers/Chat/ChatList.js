import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash';

import { ChatListComponent } from '../../components/Chat/ListComponent';
import { USER_CHAT_QUERY } from '../../graphql/queries';

export class ChatList extends React.Component {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={focused ? 'ios-text' : 'ios-text-outline'} color={tintColor} size={32} />
        )
    }

    constructor(props) {
        super(props);

        this.isDummy = true;

        if (this.isDummy) {
            this.dummyGroups = [];
            for (let i = 0; i < 10; i++) {
                this.dummyGroups.push({
                    id: 1234,
                    name: "Real Fake Street",
                    messages: [{text: 'Lorem ipsum doler set amet'}],
                    users: [{name: 'Joe Fazzino'}, {name: 'Ben Buckley'}]
                });
            }
        }

        this.state = {
            isLoading: props.data.loading,
            groups: this.isDummy ? this.dummyGroups : []
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.data !== newProps.data) {
            console.log(newProps.data)
            this.setState({
                isLoading: newProps.data.loading,
                // groups: newProps.data.User.group
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }

        if (!this.state.isLoading && this.state.groups.length === 0) {
            return (
                <View>
                    <Text>No Groups Found</Text>
                </View>
            );
        }

        return (
            <ChatListComponent navigation={this.props.navigation} data={this.state.groups} />
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login')
});

const bindActions = (dispatch) => {
    return {
        
    };
};

const userChatQuery = graphql(USER_CHAT_QUERY, {
    options: (ownProps) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') } }),
    props: ({ data }) => ({
        data,
    }),
});

export default compose(
    connect(mapStateToProps, bindActions),
    userChatQuery,    
)(ChatList)