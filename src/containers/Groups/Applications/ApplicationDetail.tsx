import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Alert, TouchableOpacity, Linking } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from '../../../consts';
import {
    CreateGroupMutationVariables,
    HouseChatQuery,
    HouseApplicationsQuery,
    UpdateApplicationMutationVariables,
    CompleteApplicationMutationVariables,
    HouseDetailQuery,
    HousePostQuery,
    AllPostsQuery,
    CreateGroupMutation,
    DeleteApplicationMutationVariables
} from '../../../graphql/Types';
import { User, House } from '../../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { TouchableRect } from '../../../widgets/TouchableRect';
import { ReduxState } from '../../../types/ReduxTypes';
import { CREATE_GROUP_MUTATION, DELETE_APPLICATION_MUTATION } from '../../../graphql/mutations';
import {
    HOUSE_CHAT_QUERY,
    HOUSE_APPLICATIONS_QUERY,
    HOUSE_DETAILS_QUERY,
    HOUSE_POST_QUERY,
    POST_LIST_QUERY
} from '../../../graphql/queries';
import { HouseApplicationDetail } from '../../../components/Applications/HouseApplicationDetail';
import UserProfile from '../../Feed/UserProfile';
import { UPDATE_APPLICATION_MUTATION } from '../../../graphql/mutations/Application/UpdateApplication';
import { COMPLETE_APPLICATION_MUTATION } from '../../../graphql/mutations/Application/CompleteApplication';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    loading: boolean;
    approverName: string;
    approverID: string;
    house: House;
    user: User;
    completeApplication: (params: CompleteApplicationMutationVariables) => void;
    deleteApplication: (params: DeleteApplicationMutationVariables) => void;
    navigation: {
        state: {
            params: {
                id: string;
                userData: User;
                houseData: House;
                isSent: boolean;
                isActive: boolean;
            };
        };
        pop: () => void;
    };
    createGroup: (
        params: CreateGroupMutationVariables & { approverID: string }
    ) => Promise<CreateGroupMutation>;
    progressApplication: (params: UpdateApplicationMutationVariables & { houseID: number }) => void;
}

interface State {
    isApproved: boolean;
}

export class ApplicationDetail extends React.Component<Props, State> {
    state = { isApproved: this.props.navigation.state.params.isActive };

    static navigationOptions = ({ navigation }) => ({
        title: 'Application Detail',
        headerRight: navigation.state.params &&
            !navigation.state.params.isSent && (
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            'Report User',
                            'If this user has done something you deem to be inappropriate or offensive please report them. In the email please be as detailed as possible.',
                            [
                                {
                                    text: 'Report',
                                    onPress: () =>
                                        Linking.openURL(
                                            `mailto:joseph@fazzino.net?subject=Report%20User%20${
                                                navigation.state.params.id
                                            }`
                                        )
                                },
                                { text: 'Cancel', style: 'cancel' }
                            ]
                        )
                    }
                    style={{ paddingRight: 12 }}
                >
                    <Icon name={'ios-flag-outline'} color={Colors.white} size={32} />
                </TouchableOpacity>
            )
    });

    render() {
        const { id, userData, isSent, houseData } = this.props.navigation.state.params;

        return (
            <>
                {isSent ? (
                    <HouseApplicationDetail
                        house={houseData}
                        navigation={this.props.navigation}
                        description={houseData.post.description}
                        title={houseData.road}
                        isLoading={this.props.loading}
                    />
                ) : (
                    <>
                        <UserProfile
                            navigation={{ state: { params: { id: userData.id, data: userData } } }}
                        />
                        <TouchableRect
                            onPress={() => {
                                Alert.alert(
                                    `Reject ${userData.firstName}`,
                                    `${userData.name}'s application will be deleted.`,
                                    [
                                        {
                                            text: 'Reject',
                                            onPress: () => {
                                                this.props.deleteApplication({
                                                    id,
                                                    applicantID: userData.id,
                                                    road: this.props.house.road,
                                                    houseID: this.props.house.shortID
                                                });

                                                this.props.navigation.pop();
                                            }
                                        },

                                        { text: 'Cancel', style: 'cancel' }
                                    ]
                                );
                            }}
                            title={`Reject Application`}
                            iconName={'times-circle'}
                            backgroundColor={Colors.definetelyNotAirbnbRed}
                            wrapperStyle={{ borderRadius: 0 }}
                            buttonStyle={{
                                width: toConstantWidth(100),
                                paddingBottom: isIphoneX() ? 18 : 0,
                                height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                            }}
                        />

                        {this.state.isApproved ? (
                            <TouchableRect
                                onPress={() => {
                                    if (userData.house) {
                                        Alert.alert(
                                            'Uh oh',
                                            'The user already has a house, to add them to yours ask them to go to their "My House" page, scroll to the bottom and press "Leave House"'
                                        );
                                        return;
                                    }

                                    Alert.alert(
                                        `Accept ${userData.firstName}`,
                                        `${userData.name}'s will be added to your house.`,
                                        [
                                            {
                                                text: 'Accept',
                                                onPress: () => {
                                                    this.props.completeApplication({
                                                        applicantID: userData.id,
                                                        applicantName: userData.name,
                                                        houseID: this.props.house.shortID,
                                                        houseName: this.props.house.road
                                                    });

                                                    this.props.navigation.pop();
                                                }
                                            },

                                            { text: 'Cancel', style: 'cancel' }
                                        ]
                                    );
                                }}
                                title={`Accept Application`}
                                iconName={'check-circle'}
                                backgroundColor={Colors.translucentDefinetelyNotAirbnbRed}
                                wrapperStyle={{ borderRadius: 0 }}
                                buttonStyle={{
                                    width: toConstantWidth(100),
                                    paddingBottom: isIphoneX() ? 18 : 0,
                                    height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                }}
                            />
                        ) : (
                            <TouchableRect
                                onPress={() =>
                                    Alert.alert(
                                        `Chat with ${userData.firstName}`,
                                        'Are you sure you want to chat with ' + userData.name + '?',
                                        [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancelled'),
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Confirm',
                                                onPress: () => {
                                                    this.props
                                                        .createGroup({
                                                            applicantID: userData.id,
                                                            approverName: this.props.approverName,
                                                            applicantName: userData.name,
                                                            approverID: this.props.approverID,
                                                            houseID: this.props.house.shortID,
                                                            roadName: this.props.house.road
                                                        })
                                                        .then((res) => {
                                                            this.props.navigation.navigate(
                                                                'ChatDetail',
                                                                {
                                                                    messages: [],
                                                                    groupData: res.data.createGroup,
                                                                    userID: this.props.approverID,
                                                                    title: userData.name
                                                                }
                                                            );
                                                        });
                                                    // Want the name of the approver/applicant and the ids of all house members so we can send them a notification
                                                    this.props.progressApplication({
                                                        id,
                                                        isActive: false,
                                                        houseID: this.props.house.shortID
                                                    });

                                                    this.setState({ isApproved: true });
                                                }
                                            }
                                        ]
                                    )
                                }
                                title={`Chat with ${userData.firstName}`}
                                iconName={'envelope-o'}
                                backgroundColor={Colors.brandTertiaryColor}
                                wrapperStyle={{ borderRadius: 0 }}
                                buttonStyle={{
                                    width: toConstantWidth(100),
                                    paddingBottom: isIphoneX() ? 18 : 0,
                                    height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                }}
                            />
                        )}
                    </>
                )}
            </>
        );
    }
}

const createGroup = graphql(CREATE_GROUP_MUTATION, {
    props: ({ mutate }) => ({
        createGroup: (params: CreateGroupMutationVariables & { approverID: string }) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { createGroup } }) => {
                    const houseData: HouseChatQuery = store.readQuery({
                        query: HOUSE_CHAT_QUERY,
                        variables: {
                            shortID: params.houseID
                        }
                    });

                    houseData.house.groups.unshift(createGroup);

                    store.writeQuery({
                        query: HOUSE_CHAT_QUERY,
                        variables: {
                            shortID: params.houseID
                        },
                        data: houseData
                    });
                }
            })
    })
});

const progressApplication = graphql(UPDATE_APPLICATION_MUTATION, {
    props: ({ mutate }) => ({
        progressApplication: (params: UpdateApplicationMutationVariables & { houseID: number }) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { updateApplication } }) => {
                    const houseData: HouseApplicationsQuery = store.readQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID }
                    });

                    houseData.house.applications = houseData.house.applications.map(
                        (app) =>
                            app.id === updateApplication.id
                                ? Object.assign(app, updateApplication)
                                : app
                    );

                    store.writeQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID },
                        data: houseData
                    });
                }
            })
    })
});

const deleteApplicationMutation = graphql(DELETE_APPLICATION_MUTATION, {
    props: ({ mutate }) => ({
        deleteApplication: (params: DeleteApplicationMutationVariables) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { deleteApplication } }) => {
                    let houseData: HouseApplicationsQuery = store.readQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID }
                    });

                    let application = houseData.house.applications.filter(
                        (app) => app.id === deleteApplication.id
                    );

                    if (!application[0].isActive) {
                        let groupData: HouseChatQuery = store.readQuery({
                            query: HOUSE_CHAT_QUERY,
                            variables: { shortID: params.houseID }
                        });

                        groupData.house.groups = groupData.house.groups.filter(
                            (group) =>
                                group.applicant ? group.applicant.id !== params.applicantID : true
                        );

                        store.writeQuery({
                            query: HOUSE_CHAT_QUERY,
                            variables: { shortID: params.houseID },
                            data: groupData
                        });
                    }

                    houseData.house.applications = houseData.house.applications.filter(
                        (app) => app.id !== deleteApplication.id
                    );

                    store.writeQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID },
                        data: houseData
                    });
                }
            })
    })
});

const completeApplicationMutation = graphql(COMPLETE_APPLICATION_MUTATION, {
    props: ({ mutate }) => ({
        completeApplication: (params: CompleteApplicationMutationVariables) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { completeApplication } }) => {
                    let houseData: HouseDetailQuery = store.readQuery({
                        variables: { shortID: params.houseID },
                        query: HOUSE_DETAILS_QUERY
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

                        allPostData.allPosts = allPostData.allPosts.filter(
                            (post) => post.id !== postData.house.post.id
                        );

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
    connect((state: ReduxState) => ({
        approverName: state.profile.name,
        house: state.profile.house,
        approverID: state.login.id
    })),
    createGroup,
    progressApplication,
    completeApplicationMutation,
    deleteApplicationMutation
)(ApplicationDetail);
