import React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import { ActivityIndicator, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { ChatListComponent } from '../../../components/Chat/ChatListComponent';
import { USER_CHAT_QUERY, HOUSE_CHAT_QUERY } from '../../../graphql/queries';
import { LoginState } from '../../../types/ReduxTypes';
import { Group, House, User } from '../../../types/Entities';
import { ErrorScreen } from '../../../widgets/ErrorScreen';
import { ErrorToast } from '../../../widgets/ErrorToast';
import { ApolloError } from 'apollo-client';
import { TRACKER } from '../../../App';

interface Props {
    loading: boolean;
    error: ApolloError;
    user: Array<User>;
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

    START_TIME = moment().unix();

    componentDidMount() {
        TRACKER.trackScreenView('ChatList');
    }

    componentWillUnmount() {
        TRACKER.trackTiming('Session', moment().unix() - this.START_TIME, {
            name: 'PostList',
            label: 'PostList'
        });
    }

    render() {
        if (Boolean(this.props.house && this.props.house.shortID)) {
            return (
                <Query
                    query={HOUSE_CHAT_QUERY}
                    variables={{ shortID: this.props.house.shortID }}
                    fetchPolicy={'cache-and-network'}
                >
                    {({ loading, error, data, refetch }) => {
                        let refetchData = () => {
                            refetch();
                            this.props.refetch();
                        };

                        if (this.props.loading || loading) {
                            return <ActivityIndicator />;
                        }

                        if (error) {
                            return (
                                <ErrorScreen
                                    message={this.props.error.message}
                                    onPress={refetchData}
                                />
                            );
                        }

                        return (
                            <>
                                {error && (
                                    <ErrorToast message={error.message} onPress={refetchData} />
                                )}
                                <ChatListComponent
                                    navigation={this.props.navigation}
                                    isLoading={loading || this.props.loading}
                                    refetch={refetchData}
                                    data={
                                        !this.props.loading && !loading
                                            ? !!data.house
                                                ? this.props.user.groups.concat(data.house.groups)
                                                : this.props.user.groups
                                            : []
                                    }
                                    userID={this.props.login.id}
                                    username={this.props.login.name}
                                />
                            </>
                        );
                    }}
                </Query>
            );
        } else {
            if (this.props.loading) {
                return <ActivityIndicator />;
            }

            if (this.props.error && this.props.user.groups === undefined) {
                return (
                    <ErrorScreen message={this.props.error.message} onPress={this.props.refetch} />
                );
            }

            if (this.props.error && !!this.props.user.groups) {
                return (
                    <>
                        {this.props.error && (
                            <ErrorToast
                                message={this.props.error.message}
                                onPress={this.props.refetch}
                            />
                        )}
                        <ChatListComponent
                            navigation={this.props.navigation}
                            data={this.props.user.groups}
                            isLoading={this.props.loading}
                            refetch={this.props.refetch}
                            userID={this.props.login.id}
                            username={this.props.login.name}
                        />
                    </>
                );
            }

            console.log(this.props.user.groups);
            return (
                <ChatListComponent
                    navigation={this.props.navigation}
                    data={this.props.user.groups}
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
    props: ({ data: { loading, user, error, refetch } }) => ({
        loading,
        user,
        error,
        refetch
    })
});

export default compose(
    connect(
        mapStateToProps,
        bindActions
    ),
    userChatQuery
)(ChatList);
