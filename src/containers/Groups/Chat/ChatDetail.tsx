import React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { ReduxState } from '../../../types/ReduxTypes';
import {
    ChatMessagesQueryVariables,
    CreateMessageMutationVariables,
    ChatMessagesQuery,
    MessageAddedSubscription
} from '../../../graphql/Types';
import { Group } from '../../../types/Entities';
import { ChildProps, graphql, compose, Query } from 'react-apollo';
import { GET_CHAT_MESSAGES_QUERY } from '../../../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/mutations/Chat/CreateMessage';
import { ApolloError } from 'apollo-client';
import { ActivityIndicator, Platform } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { MESSAGE_ADDED_SUBSCRIPTION } from '../../../graphql/subscriptions/Chat/MessageAdded';

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
        push: (route, params) => void;
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


        return (
            <Query query={GET_CHAT_MESSAGES_QUERY} variables={{ id: this.props.navigation.state.params.groupData.id }} fetchPolicy={'network-only'}>
                {({ subscribeToMore, data, loading }: { subscribeToMore: any; data: ChatMessagesQuery; loading: boolean; }) => {
                    if (loading) {
                        return <ActivityIndicator />;
                    }

                    console.log(data);

                    return (
                        <ChatDetailComponent
                            subscribeToNewMessages={() => subscribeToMore({
                                document: MESSAGE_ADDED_SUBSCRIPTION,
                                variables: { groupID: this.props.navigation.state.params.groupData.id },
                                updateQuery: (prev, { subscriptionData }: { subscriptionData: { data?: MessageAddedSubscription } }) => {
                                    if (!subscriptionData.data) {
                                        return prev;
                                    }

                                    const newComment = subscriptionData.data.message.node;

                                    const newPayload = Object.assign({}, prev, {
                                        group: {
                                            messages: prev.group.messages.concat(newComment),
                                            __typename: 'Group'
                                        }
                                    });

                                    return newPayload;
                                }
                            })}
                            navigation={this.props.navigation}
                            data={{
                                groupInfo: this.props.navigation.state.params.groupData,
                                messages: data.group.messages
                            }}
                            userID={this.props.navigation.state.params.userID}
                            createMessage={this.props.createMessage}
                        />
                    )
                }}
            </Query>
        );
    }
}

// const getMessages = graphql<
//     InputProps,
//     ChatMessagesQuery,
//     ChatMessagesQueryVariables,
//     ChildProps<ChatMessagesQuery>
//     >(GET_CHAT_MESSAGES_QUERY, {
//         options: (ownProps) => ({
//             variables: {
//                 id: ownProps.navigation.state.params.groupData.id
//             },
//             fetchPolicy: 'network-only'
//         }),
//         props: ({ data: { loading, group, error } }) => ({
//             loading,
//             group,
//             error
//         })
//     });

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
                        images: params.images,
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
    createMessage
)(ChatDetail);
