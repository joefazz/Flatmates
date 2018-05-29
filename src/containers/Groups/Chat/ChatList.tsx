import React from 'react';
import { compose, graphql } from 'react-apollo';
import { ActivityIndicator, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { ChatListComponent } from '../../../components/Chat/ChatListComponent';
import { USER_CHAT_QUERY } from '../../../graphql/queries';
import { LoginState } from '../../../types/ReduxTypes';
import { Group } from '../../../types/Entities';

interface Props {
    loading: boolean;
    groups: Array<Group>;
    navigation: { navigate: (route: string) => void };
    login: LoginState;
}

interface State {
    isLoading: boolean;
    groups: Array<Group>;
}

export class ChatList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Chat',
        header: null
    };

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <>
                <StatusBar barStyle={'dark-content'} />
                <ChatListComponent
                    navigation={this.props.navigation}
                    data={this.props.groups}
                    userID={this.props.login.id}
                    username={this.props.login.name}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.login
});

const bindActions = () => {
    return {};
};

const userChatQuery = graphql(USER_CHAT_QUERY, {
    options: (ownProps: Props) => ({
        variables: { id: ownProps.login.id },
        fetchPolicy: 'network-only'
    }),
    // @ts-ignore
    props: ({ data: { loading, user, error } }) => {
        return loading ? { loading } : { loading, groups: user.groups, error };
    }
});

export default compose(connect(mapStateToProps, bindActions), userChatQuery)(ChatList);
