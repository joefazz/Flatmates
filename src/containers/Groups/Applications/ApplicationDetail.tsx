import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Alert, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from '../../../consts';
import {
    CreateGroupMutationVariables,
    HouseChatQuery,
    HouseApplicationsQuery,
    UpdateApplicationMutationVariables,
    CompleteApplicationMutationVariables,
    HouseDetailQuery
} from '../../../graphql/Types';
import { User, House } from '../../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { TouchableRect } from '../../../widgets/TouchableRect';
import { ReduxState } from '../../../types/ReduxTypes';
import { DELETE_APPLICATION_MUTATION, CREATE_GROUP_MUTATION } from '../../../graphql/mutations';
import { HOUSE_CHAT_QUERY, HOUSE_APPLICATIONS_QUERY, HOUSE_DETAILS_QUERY } from '../../../graphql/queries';
import { HouseApplicationDetail } from '../../../components/Applications/HouseApplicationDetail';
import UserProfile from '../../Feed/UserProfile';
import { UPDATE_APPLICATION_MUTATION } from '../../../graphql/mutations/Application/UpdateApplication';
import { COMPLETE_APPLICATION_MUTATION } from '../../../graphql/mutations/Application/CompleteApplication';

interface Props {
    loading: boolean;
    approverName: string;
    approverID: string;
    house: House;
    user: User;
    completeApplication: (params: CompleteApplicationMutationVariables) => void;
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
    createGroup: (params: CreateGroupMutationVariables & { approverID: string }) => void;
    progressApplication: (params: UpdateApplicationMutationVariables & { houseID: number }) => void;
}

export class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        title: 'Application Detail'
    });

    render() {
        const { id, userData, isSent, houseData, isActive } = this.props.navigation.state.params;

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
                            <View
                                style={{
                                    height: toConstantHeight(isIphoneX() ? 9.4 : 7.4),
                                    position: 'absolute',
                                    bottom: 0
                                }}
                            >
                                {isActive ?
                                    <TouchableRect
                                        onPress={() => this.props.completeApplication({
                                            applicantID: userData.id,
                                            applicantName: userData.name,
                                            houseID: this.props.house.shortID,
                                            houseName: this.props.house.road
                                        })}
                                        title={`Accept ${userData.firstName} as your new Flatmate`}
                                        iconName={'check-square-o'}
                                        backgroundColor={Colors.brandSuccessColor}
                                        wrapperStyle={{ borderRadius: 0 }}
                                        buttonStyle={{
                                            width: toConstantWidth(100),
                                            paddingBottom: isIphoneX() ? 18 : 0,
                                            height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                        }}
                                    />
                                    :
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
                                                            this.props.navigation.pop();
                                                            this.props.createGroup({
                                                                applicantID: userData.id,
                                                                approverName: this.props.approverName,
                                                                applicantName: `${userData.name}`,
                                                                approverID: this.props.approverID,
                                                                houseID: this.props.house.shortID,
                                                                roadName: this.props.house.road
                                                            });
                                                            // Want the name of the approver/applicant and the ids of all house members so we can send them a notification
                                                            this.props.progressApplication({
                                                                id,
                                                                isActive: false,
                                                                houseID: this.props.house.shortID
                                                            });
                                                        }
                                                    }
                                                ]
                                            )
                                        }
                                        title={`Chat with ${userData.firstName}`}
                                        iconName={'envelope-o'}
                                        backgroundColor={Colors.brandPrimaryColor}
                                        wrapperStyle={{ borderRadius: 0 }}
                                        buttonStyle={{
                                            width: toConstantWidth(100),
                                            paddingBottom: isIphoneX() ? 18 : 0,
                                            height: toConstantHeight(isIphoneX() ? 9.4 : 7.4)
                                        }}
                                    />}
                            </View>
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
                        (app) => app.id === updateApplication.id ? Object.assign(app, updateApplication) : app
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
    props: ({ mutate }) =>
        ({
            completeApplication: (params: CompleteApplicationMutationVariables) => mutate({
                variables: { ...params },
                update: (store, { completeApplication }) => {
                    let houseData: HouseDetailQuery = store.readQuery({
                        variables: { shortID: params.houseID },
                        query: HOUSE_DETAILS_QUERY,
                    });

                    // THIS IS TO CHECK TOMORROW

                    if (houseData.house.spaces === 1) {
                        let groupData: HouseChatQuery = store.readQuery({
                            variables: { shortID: params.houseID },
                            query: HOUSE_CHAT_QUERY
                        });

                        groupData.house.groups = completeApplication.groups;

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
})

export default compose(
    connect((state: ReduxState) => ({
        approverName: state.profile.name,
        house: state.profile.house,
        approverID: state.login.id
    })),
    createGroup,
    progressApplication,
    completeApplicationMutation
)(ApplicationDetail);
