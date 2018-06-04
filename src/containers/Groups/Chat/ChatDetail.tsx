import React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { ReduxState } from '../../../types/ReduxTypes';
import {
    ChatMessagesQueryVariables,
    CreateMessageMutationVariables,
    ChatMessagesQuery
} from '../../../graphql/Types';
import { Group } from '../../../types/Entities';
import { ChildProps, graphql, compose } from 'react-apollo';
import { GET_CHAT_MESSAGES_QUERY } from '../../../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/mutations/Chat/CreateMessage';
import { ApolloError } from 'apollo-client';
import { ActivityIndicator, Platform } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

interface Props {
    createMessage: (params: CreateMessageMutationVariables) => void;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                groupData: Group;
                userID: string;
            };
        };
    };
    group: Group;
    loading: boolean;
    error: ApolloError;
}

export class ChatDetail extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        tabBarVisible: false
    });

    componentDidMount() {
        if (Platform.OS === 'android') {
            AndroidKeyboardAdjust.setAdjustResize();
        }
    }

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <ChatDetailComponent
                data={{
                    groupInfo: this.props.navigation.state.params.groupData,
                    messages: this.props.group.messages
                }}
                userID={this.props.navigation.state.params.userID}
                createMessage={this.props.createMessage}
            />
        );
    }
}

interface InputProps {
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                groupData: Group;
                userID: string;
            };
        };
    };
}

const getMessages = graphql<
    InputProps,
    ChatMessagesQuery,
    ChatMessagesQueryVariables,
    ChildProps<ChatMessagesQuery>
>(GET_CHAT_MESSAGES_QUERY, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.navigation.state.params.groupData.id
        },
        fetchPolicy: 'network-only'
    }),
    props: ({ data: { loading, group, error } }) => ({
        loading,
        group,
        error
    })
});

const createMessage = graphql(CREATE_MESSAGE_MUTATION, {
    props: ({ mutate }) => ({
        createMessage: (params: CreateMessageMutationVariables & { approverID: string }) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { createMessage } }) => {
                    const groupData: ChatMessagesQuery = store.readQuery({
                        query: GET_CHAT_MESSAGES_QUERY,
                        variables: {
                            id: params.groupID
                        }
                    });

                    groupData.group.messages.push(createMessage);

                    store.writeQuery({
                        query: GET_CHAT_MESSAGES_QUERY,
                        variables: {
                            id: params.groupID
                        },
                        data: groupData
                    });
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    createMessage: {
                        __typename: 'Message',
                        id: -1, // don't know id yet, but it doesn't matter
                        text: params.text, // we know what the text will be
                        createdAt: new Date().toISOString(), // the time is now!
                        from: {
                            __typename: 'User',
                            id: params.senderID,
                            username: params.senderName,
                            profilePicture: ''
                        },
                        to: {
                            __typename: 'Group',
                            id: params.groupID
                        }
                    }
                }
            })
    })
});

export default compose(
    getMessages,
    createMessage
)(ChatDetail);
