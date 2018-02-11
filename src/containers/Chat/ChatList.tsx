import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { ChatListComponent } from '../../components/Chat/ChatListComponent';
import { USER_CHAT_QUERY } from '../../graphql/queries';

interface Props  {
    loading: boolean,
    groups: Array<object>,
    navigation: { navigate: (route: string) => void },
    login: any
};

interface State {
    isLoading: boolean,
    groups: Array<object>
};

export class ChatList extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Chat',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-text' : 'ios-text-outline' : 'md-text'} color={tintColor} size={32} />
        )
    }

    isDummy: boolean;
    dummyGroups: Array<object>;

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
    return {};
};

const userChatQuery = graphql(USER_CHAT_QUERY, {
    options: (ownProps: Props) => ({ variables: { facebookUserId: ownProps.login.get('fbUserId') } }),
    // @ts-ignore
    props: ({ data: {loading, groups} }) => ({
        loading,
        groups
    }),
});

export default compose(
    connect(mapStateToProps, bindActions),
    userChatQuery,
)(ChatList);
