import React from 'react';
import { compose, graphql } from 'react-apollo';
import { ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';

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

    constructor(props) {
        super(props);

        this.state = {
            houseGroups: [],
            isFetchingHouseGroups: Boolean(this.props.house && this.props.house.shortID)
        };
    }

    componentDidMount() {
        if (Boolean(this.props.house && this.props.house.shortID))
            client
                .query<HouseChatQuery>({
                    query: HOUSE_CHAT_QUERY,
                    variables: { shortID: this.props.house.shortID },
                    fetchPolicy: 'network-only'
                })
                .then((res) =>
                    this.setState({
                        houseGroups: res.data.house.groups,
                        isFetchingHouseGroups: false
                    })
                )
                .catch((err) => console.log(err));
    }

    render() {
        if (this.props.loading || this.state.isFetchingHouseGroups) {
            return <ActivityIndicator />;
        }

        if (this.props.error) {
            return <Text>Error</Text>;
        }

        return (
            <ChatListComponent
                navigation={this.props.navigation}
                data={this.props.userGroups.concat(this.state.houseGroups)}
                userID={this.props.login.id}
                username={this.props.login.name}
            />
        );
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

export default compose(connect(mapStateToProps, bindActions), userChatQuery)(ChatList);
