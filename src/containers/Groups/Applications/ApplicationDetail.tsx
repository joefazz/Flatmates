import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Alert, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ProfileComponent } from '../../../components/Profile/ProfileComponent';
import { Colors } from '../../../consts';
import {
    CreateGroupMutationVariables,
    DeleteApplicationMutationVariables,
    UserChatQuery,
    HouseApplicationsQuery
} from '../../../graphql/Types';
import { User } from '../../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { TouchableRect } from '../../../widgets/TouchableRect';
import { ReduxState } from '../../../types/ReduxTypes';
import { DELETE_APPLICATION_MUTATION, CREATE_GROUP_MUTATION } from '../../../graphql/mutations';
import { USER_CHAT_QUERY, HOUSE_APPLICATIONS_QUERY } from '../../../graphql/queries';

interface Props {
    loading: boolean;
    approverName: string;
    approverID: string;
    houseName: string;
    user: User;
    navigation: {
        state: {
            params: {
                id: string;
                userData: User;
                houseUserIDs: Array<string>;
            };
        };
        pop: () => void;
    };
    createGroup: (params: CreateGroupMutationVariables & { approverID: string }) => void;
    removeApplication: (id: string, approverName: string, applicantName: string) => void;
}

export class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        title: 'Application Detail'
    });

    render() {
        const { id, userData, houseUserIDs } = this.props.navigation.state.params;
        console.log(this.props);
        return (
            <>
                <ProfileComponent isLoading={this.props.loading} profile={userData} />
                <View
                    style={{
                        height: toConstantHeight(isIphoneX() ? 9.4 : 7.4),
                        position: 'absolute',
                        bottom: 0
                    }}
                >
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
                                                playerID: userData.playerId,
                                                applicantID: userData.id,
                                                approverName: this.props.approverName,
                                                houseUserIDs,
                                                name: `${userData.name}|${this.props.houseName}`,
                                                approverID: this.props.approverID
                                            });
                                            // Want the name of the approver/applicant and the ids of all house members so we can send them a notification
                                            this.props.removeApplication(
                                                id,
                                                this.props.approverName,
                                                userData.firstName
                                            );
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
                    />
                </View>
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
                    const userData: UserChatQuery = store.readQuery({
                        query: USER_CHAT_QUERY,
                        variables: {
                            id: params.approverID
                        }
                    });

                    userData.user.groups.unshift(createGroup);

                    store.writeQuery({
                        query: USER_CHAT_QUERY,
                        variables: {
                            id: params.approverID
                        },
                        data: userData
                    });
                }
            })
    })
});

const removeApplication = graphql(DELETE_APPLICATION_MUTATION, {
    props: ({ mutate }) => ({
        removeApplication: (params: DeleteApplicationMutationVariables & { houseID: number }) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { removeApplication } }) => {
                    const houseData: HouseApplicationsQuery = store.readQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID }
                    });

                    const index = houseData.house.applications.findIndex(
                        (app) => app.id === removeApplication.id
                    );

                    houseData.house.applications.splice(index, 1);

                    store.writeQuery({
                        query: HOUSE_APPLICATIONS_QUERY,
                        variables: { shortID: params.houseID },
                        data: houseData
                    });
                }
            })
    })
});

export default compose(
    connect((state: ReduxState) => ({
        approverName: state.profile.name,
        houseName: state.profile.house.road,
        approverID: state.login.id
    })),
    createGroup,
    removeApplication
)(ApplicationDetail);
