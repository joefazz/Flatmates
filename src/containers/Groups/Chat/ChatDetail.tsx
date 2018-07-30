import { ApolloError } from 'apollo-client';
import React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import { Platform, Text } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { connect } from 'react-redux';
import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/mutations/Chat/CreateMessage';
import { GET_CHAT_MESSAGES_QUERY, HOUSE_CHAT_QUERY, USER_CHAT_QUERY } from '../../../graphql/queries';
import { MESSAGE_ADDED_SUBSCRIPTION } from '../../../graphql/subscriptions/Chat/MessageAdded';
import { ChatMessagesQuery, CreateMessageMutationVariables, HouseChatQuery, MessageAddedSubscription, UserChatQuery } from '../../../graphql/Types';
import { Group } from '../../../types/Entities';
import { ReduxState } from '../../../types/ReduxTypes';


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
    username: string;
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
                {({ subscribeToMore, data, loading, error, refetch, fetchMore }: { subscribeToMore: any; data: ChatMessagesQuery; loading: boolean; refetch: () => void; error: ApolloError, fetchMore: any; }) => {

                    if (error) {
                        return (<Text>{error.message}</Text>)
                    }


                    return (
                        <ChatDetailComponent
                            fetchMoreMessages={() => fetchMore({
                                variables: { id: data.group.id, skip: data.group.messages.length }, updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) {
                                        return prev;
                                    }


                                    return { group: { id: prev.group.id, __typename: 'Group', messages: [...fetchMoreResult.group.messages, ...prev.group.messages] } }


                                }
                            })}
                            subscribeToNewMessages={() => subscribeToMore({
                                document: MESSAGE_ADDED_SUBSCRIPTION,
                                variables: { groupID: this.props.navigation.state.params.groupData.id },
                                updateQuery: (prev, { subscriptionData }: { subscriptionData: { data?: MessageAddedSubscription } }) => {
                                    if (!subscriptionData.data) {
                                        return prev;
                                    }

                                    const newComment = subscriptionData.data.message.node;

                                    if (prev.group.messages.find(message => message.id === newComment.id) === undefined) {

                                        const newPayload = Object.assign({}, prev, {
                                            group: {
                                                messages: prev.group.messages.concat(newComment),
                                                __typename: 'Group'
                                            }
                                        });

                                        return newPayload;
                                    } else {
                                        return prev;
                                    }

                                }
                            })}
                            navigation={this.props.navigation}
                            isLoading={loading}
                            username={this.props.username}
                            data={{
                                groupInfo: this.props.navigation.state.params.groupData,
                                messages: loading ? [] : data.group.messages
                            }}
                            refetch={refetch}
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
        createMessage: (params: CreateMessageMutationVariables & { houseID: number }) =>
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

                    const userListData: UserChatQuery = store.readQuery({
                        query: USER_CHAT_QUERY,
                        variables: { id: params.senderID }
                    });

                    if (userListData.user.groups.find(group => group.id === params.groupID) !== undefined) {

                        const newData = userListData.user.groups.map(group => group.id === params.groupID ? Object.assign(group, { messages: [createMessage] }) : group);

                        store.writeQuery({
                            query: USER_CHAT_QUERY,
                            data: newData
                        });

                    } else {
                        const houseListData: HouseChatQuery = store.readQuery({
                            query: HOUSE_CHAT_QUERY,
                            variables: { shortID: params.houseID }
                        });

                        const newData = houseListData.house.groups.map(group => group.id === params.groupID ? Object.assign(group, { messages: [createMessage] }) : group);

                        store.writeQuery({
                            query: HOUSE_CHAT_QUERY,
                            data: newData
                        })
                    }


                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    createMessage: {
                        __typename: 'Message',
                        id: Math.floor(Math.random() * Math.floor(100000)), // don't know id yet, but it doesn't matter
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
    connect((state: ReduxState) => ({ username: state.profile.name }), {}),
    createMessage
)(ChatDetail);
