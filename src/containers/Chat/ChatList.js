import React from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';

import { ChatListComponent } from '../../components/Chat/ChatListComponent';
import { USER_CHAT_QUERY } from '../../graphql/queries';

type Props = {
    loading: boolean,
    groups: Array<Object>,
    navigation: Object
};

type State = {
    isLoading: boolean,
    groups: Array<Object>
};

export class ChatList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-text' : 'ios-text-outline' : 'md-text'} color={tintColor} size={32} />
        )
    }

    constructor(props) {
        super(props);

        this.isDummy = true;

        if (this.isDummy) {
            this.dummyGroups = [];
            for (let i = 0; i < 10; i++) {
                this.dummyGroups.push({
                    id: i,
                    name: 'Real Fake Street',
                    lastMessageText: 'Lorem ipsum doler set amet',
                    users: [{name: 'Joe Fazzino'}, {name: 'Ben Buckley'}]
                });
            }
        }

        this.state = {
            isLoading: props.loading,
            groups: this.isDummy ? this.dummyGroups : []
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.loading !== newProps.loading) {
            this.setState({
                isLoading: newProps.loading,
                // groups: newProps.data.User.group
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
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

const bindActions = () => {
    return {
        
    };
};

const userChatQuery = graphql(USER_CHAT_QUERY, {
    options: (ownProps) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') } }),
    props: ({ data: {loading, groups} }) => ({
        loading,
        groups
    }),
});

export default compose(
    connect(mapStateToProps, bindActions),
    userChatQuery,    
)(ChatList);