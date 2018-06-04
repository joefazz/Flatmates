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
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        if (this.props.error) {
            return <Text>Error</Text>;
        }

        if (Boolean(this.props.house && this.props.house.shortID)) {
            return (
                <Query
                    query={HOUSE_CHAT_QUERY}
                    variables={{ shortID: this.props.house.shortID }}
                    fetchPolicy={'network-only'}
                >
                    {({ loading, error, data }) => {
                        if (error) {
                            console.log(error);
                            alert(error.message);
                            return <Text>Error: {error.message}</Text>;
                        }

                        if (loading) {
                            return <ActivityIndicator />;
                        }

                        console.log(data);

                        return (
                            <ChatListComponent
                                navigation={this.props.navigation}
                                data={this.props.userGroups.concat(data.house.groups)}
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
        fetchPolicy: 'network-only'
    }),
    // @ts-ignore
    props: ({ data: { loading, user, error } }) => {
        return loading
            ? { loading }
            : error
                ? { loading, error }
                : { loading, userGroups: user.groups, error };
    }
});

export default compose(
    connect(
        mapStateToProps,
        bindActions
    ),
    userChatQuery
)(ChatList);
