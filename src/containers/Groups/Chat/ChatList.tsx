import React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import { ActivityIndicator, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { ChatListComponent } from '../../../components/Chat/ChatListComponent';
import { USER_CHAT_QUERY, HOUSE_CHAT_QUERY } from '../../../graphql/queries';
import { LoginState } from '../../../types/ReduxTypes';
import { Group, House } from '../../../types/Entities';
import client from '../../../Client';
import { HouseChatQuery } from '../../../graphql/Types';

interface Props {
    loading: boolean;
    error: boolean;
    userGroups: Array<Group>;
    navigation: { navigate: (route: string) => void };
    login: LoginState;
    house: House;
    refetch: () => void;
}

interface State {
    isFetchingHouseGroups: boolean;
    houseGroups: Array<Group>;
}

export class ChatList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Chat',
        header: null
    };

    render() {
        if (this.props.error) {
            return <Text>Error</Text>;
        }

        if (Boolean(this.props.house && this.props.house.shortID)) {
            return (
                <Query
                    query={HOUSE_CHAT_QUERY}
                    variables={{ shortID: this.props.house.shortID }}
                    fetchPolicy={'cache-and-network'}
                >
                    {({ loading, error, data, refetch }) => {
                        if (error) {
                            console.log(error);
                            return <Text>Error: {error.message}</Text>;
                        }

                        return (
                            <ChatListComponent
                                navigation={this.props.navigation}
                                isLoading={loading || this.props.loading}
                                refetch={refetch}
                                data={!loading && !this.props.loading ? this.props.userGroups.concat(data.house.groups) : []}
                                userID={this.props.login.id}
                                username={this.props.login.name}
                            />
                        );
                    }}
                </Query>
            );
        } else {
            return (
                <ChatListComponent
                    navigation={this.props.navigation}
                    data={this.props.userGroups}
                    isLoading={this.props.loading}
                    refetch={this.props.refetch}
                    userID={this.props.login.id}
                    username={this.props.login.name}
                />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    house: state.profile.house
});

const bindActions = () => {
    return {};
};

const userChatQuery = graphql(USER_CHAT_QUERY, {
    options: (ownProps: Props) => ({
        variables: { id: ownProps.login.id },
        fetchPolicy: 'cache-and-network'
    }),
    // @ts-ignore
    props: ({ data: { loading, user, error, refetch } }) => {
        return loading
            ? { loading }
            : error
                ? { loading, error }
                : { loading, userGroups: user.groups, error, refetch };
    }
});

export default compose(
    connect(
        mapStateToProps,
        bindActions
    ),
    userChatQuery
)(ChatList);
