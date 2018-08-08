import { ApolloError } from 'apollo-client';
import React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import { Platform, Text, TouchableOpacity, Modal, View, Alert } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Icon from "react-native-vector-icons/Entypo";
import { connect } from 'react-redux';
import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { CREATE_MESSAGE_MUTATION } from '../../../graphql/mutations/Chat/CreateMessage';
import { GET_CHAT_MESSAGES_QUERY, HOUSE_CHAT_QUERY, USER_CHAT_QUERY, HOUSE_DETAILS_QUERY, HOUSE_APPLICATIONS_QUERY, HOUSE_POST_QUERY, POST_LIST_QUERY } from '../../../graphql/queries';
import { MESSAGE_ADDED_SUBSCRIPTION } from '../../../graphql/subscriptions/Chat/MessageAdded';
import { ChatMessagesQuery, CreateMessageMutationVariables, HouseChatQuery, MessageAddedSubscription, UserChatQuery, CompleteApplicationMutationVariables, CompleteApplicationMutation, HouseDetailQuery, HouseApplicationsQuery, HousePostQuery, AllPostsQuery } from '../../../graphql/Types';
import { Group } from '../../../types/Entities';
import { ReduxState } from '../../../types/ReduxTypes';
import { Colors } from '../../../consts';
import { toConstantWidth, toConstantHeight } from '../../../utils/PercentageConversion';
import { FontFactory } from '../../../consts/font';
import { COMPLETE_APPLICATION_MUTATION } from '../../../graphql/mutations/Application/CompleteApplication';
import { ErrorScreen } from '../../../widgets/ErrorScreen';
import { ErrorToast } from '../../../widgets/ErrorToast';


interface Props {
    createMessage: (params: CreateMessageMutationVariables) => void;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                groupData: Group;
                userID: string;
                title: string;
            };
        };
        setParams: (params) => void;
        push: (route, params) => void;
    };
    group: Group;
    username: string;
    loading: boolean;
    error: ApolloError;
    completeApplication: (params: CompleteApplicationMutationVariables) => void;
}

interface State {
    showOptionModal: boolean;
}

export class ChatDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        tabBarVisible: false,
        headerRight: navigation.state.params && navigation.state.params.groupData.applicant && navigation.state.params.approvePermissions && (
            <TouchableOpacity style={{ marginRight: toConstantWidth(2) }} onPress={() => navigation.state.params && navigation.state.params.toggleModal(true)}>
                <Icon name={'dots-three-horizontal'} color={Colors.white} size={24} />
            </TouchableOpacity>
        )
    })

    state = { showOptionModal: false };

    componentDidMount() {
        if (Platform.OS === 'android') {
            AndroidKeyboardAdjust.setAdjustResize();
        }

        this.props.navigation.setParams({ toggleModal: this.toggleModal });
    }

    toggleModal = (option: boolean) => {
        this.setState({ showOptionModal: option });
    }

    acceptFlatmate = () => {
        const { applicant, house } = this.props.navigation.state.params.groupData;

        if (applicant.house) {
            Alert.alert('Uh oh', 'The user already has a house, to add them to yours ask them to go to their "My House" page, scroll to the bottom and press "Leave House"');
            return;
        }

        if (!!applicant) {
            this.props.completeApplication({
                applicantID: applicant.id,
                applicantName: applicant.name,
                houseID: house.shortID,
                houseName: house.road
            });
        }
    }

    render() {
        if (!Boolean(this.props.navigation.state.params.groupData.applicant)) {
            return (
                <Query query={GET_CHAT_MESSAGES_QUERY} variables={{ id: this.props.navigation.state.params.groupData.id }} fetchPolicy={'network-only'}>
                    {({ subscribeToMore, data, loading, error, refetch, fetchMore }: { subscribeToMore: any; data: ChatMessagesQuery; loading: boolean; refetch: () => void; error?: ApolloError, fetchMore: any; }) => {

                        if (error) {
                            return (<Text>{error.message}</Text>);
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

                                        if (prev.group.messages.find((message) => message.id === newComment.id) === undefined) {

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
                                isHouseChat={true}
                                data={{
                                    groupInfo: this.props.navigation.state.params.groupData,
                                    messages: loading ? [] : data.group.messages
                                }}
                                refetch={refetch}
                                userID={this.props.navigation.state.params.userID}
                                createMessage={this.props.createMessage}
                            />
                        );
                    }}
                </Query>
            );
        }

        return (
            <Query query={GET_CHAT_MESSAGES_QUERY} variables={{ id: this.props.navigation.state.params.groupData.id }} fetchPolicy={'network-only'}>
                {({ subscribeToMore, data, loading, error, refetch, fetchMore }: { subscribeToMore: any; data: ChatMessagesQuery; loading: boolean; refetch: () => void; error?: ApolloError, fetchMore: any; }) => {

                    if (error) {
                        return <ErrorScreen message={error.message} onPress={refetch} />;
                    }

                    return (
                        <>
                            {error && <ErrorToast message={error.message} onPress={refetch} />}
                            <Modal visible={this.state.showOptionModal} transparent={true} animationType={'fade'}>
                                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: toConstantWidth(60), height: toConstantHeight(45), backgroundColor: Colors.offWhite, borderRadius: 4, alignItems: 'center', paddingTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ ...FontFactory({ weight: 'Bold' }), color: Colors.brandPrimaryColor, fontSize: 20 }}>{this.props.navigation.state.params.title}</Text>

                                        <View>
                                            <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: Colors.brandErrorColor, width: toConstantWidth(60), paddingVertical: 10, alignItems: 'center', marginTop: 10 }} onPress={() => this.acceptFlatmate()} >
                                                <Text style={{ ...FontFactory(), fontSize: 16, color: Colors.white, textAlign: 'center' }}>Accept Application</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: Colors.brandErrorColor, width: toConstantWidth(60), paddingVertical: 10, alignItems: 'center', marginTop: 5 }} onPress={() => this.setState({ showOptionModal: false }, () => this.props.navigation.push('UserProfile', { id: this.props.navigation.state.params.groupData.applicant.id, data: this.props.navigation.state.params.groupData.applicant }))} >
                                                <Text style={{ ...FontFactory(), fontSize: 16, color: Colors.white, textAlign: 'center' }}>View Profile</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: Colors.brandTertiaryColor, width: toConstantWidth(60), paddingVertical: 10, alignItems: 'center', marginTop: 10, borderBottomEndRadius: 4, borderBottomLeftRadius: 4 }} onPress={() => this.toggleModal(false)} >
                                            <Text style={{ ...FontFactory(), fontSize: 16, color: Colors.white }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
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
                                isHouseChat={false}
                                refetch={refetch}
                                userID={this.props.navigation.state.params.userID}
                                createMessage={this.props.createMessage}
                            />
                        </>
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
        createMessage: (params: CreateMessageMutationVariables) =>
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

                    // const userListData: UserChatQuery = store.readQuery({
                    //     query: USER_CHAT_QUERY,
                    //     variables: { id: params.senderID }
                    // });

                    // if (userListData.user.groups.find(group => group.id === params.groupID) !== undefined) {

                    //     const newData = userListData.user.groups.map(group => group.id === params.groupID ? Object.assign(group, { messages: [createMessage] }) : group);

                    //     store.writeQuery({
                    //         query: USER_CHAT_QUERY,
                    //         data: newData
                    //     });

                    // } else {
                    //     const houseListData: HouseChatQuery = store.readQuery({
                    //         query: HOUSE_CHAT_QUERY,
                    //         variables: { shortID: params.houseID }
                    //     });

                    //     const newData = houseListData.house.groups.map(group => group.id === params.groupID ? Object.assign(group, { messages: [createMessage] }) : group);
                    //     store.writeQuery({
                    //         query: HOUSE_CHAT_QUERY,
                    //         data: newData
                    //     });
                    // }


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

const completeApplicationMutation = graphql(COMPLETE_APPLICATION_MUTATION, {
    props: ({ mutate }) =>
        ({
            completeApplication: (params: CompleteApplicationMutationVariables) => mutate({
                variables: { ...params },
                update: (store, { data: { completeApplication } }) => {
                    let houseData: HouseDetailQuery = store.readQuery({
                        variables: { shortID: params.houseID },
                        query: HOUSE_DETAILS_QUERY,
                    });

                    if (houseData.house.spaces === 1) {
                        let groupData: HouseChatQuery = store.readQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_CHAT_QUERY
                        });

                        if (groupData.house) {
                            groupData.house.groups = completeApplication.groups;
                        }

                        store.writeQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_CHAT_QUERY,
                            data: groupData
                        });

                        let applicationData: HouseApplicationsQuery = store.readQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_APPLICATIONS_QUERY
                        });

                        applicationData.house.applications = [];

                        store.writeQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_APPLICATIONS_QUERY,
                            data: applicationData
                        });

                        let postData: HousePostQuery = store.readQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_POST_QUERY
                        });

                        let allPostData: AllPostsQuery = store.readQuery({
                            query: POST_LIST_QUERY,
                            variables: {
                                take: 10,
                                skip: 0
                            }
                        });

                        allPostData.allPosts = allPostData.allPosts.filter(post => post.id !== postData.house.post.id);

                        store.writeQuery({
                            query: POST_LIST_QUERY,
                            variables: {
                                take: 10,
                                skip: 0
                            },
                            data: allPostData
                        });


                        postData.house.post = null;

                        store.writeQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_POST_QUERY,
                            data: postData
                        });
                    }

                    houseData.house.spaces--;

                    store.writeQuery({
                        variables: { shortID: params.houseID },
                        query: HOUSE_DETAILS_QUERY,
                        data: houseData
                    });
                }
            })
        })
});

export default compose(
    connect((state: ReduxState) => ({ username: state.profile.name }), {}),
    createMessage,
    completeApplicationMutation
)(ChatDetail);
