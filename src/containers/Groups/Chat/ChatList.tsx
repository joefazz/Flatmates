import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? focused
                            ? 'ios-notifications'
                            : 'ios-notifications-outline'
                        : 'md-notifications'
                }
                color={tintColor}
                size={32}
            />
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: props.loading,
            groups: []
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.loading !== newProps.loading) {
            this.setState({
                isLoading: newProps.loading,
                groups: newProps.user.group
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }

        return <ChatListComponent navigation={this.props.navigation} data={this.state.groups} />;
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
        variables: { id: ownProps.login.id }
    }),
    // @ts-ignore
    props: ({ data: { loading, user } }) => ({
        loading,
        user
    })
});

export default compose(connect(mapStateToProps, bindActions), userChatQuery)(ChatList);
