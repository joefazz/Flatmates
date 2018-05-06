import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ProfileComponent } from '../../../components/Profile/ProfileComponent';
import { Colors } from '../../../consts';
import {
    CreateGroupMutationVariables,
    DeleteApplicationMutationVariables
} from '../../../graphql/Types';
import { createGroup } from '../../../redux/Routines';
import { User } from '../../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { TouchableRect } from '../../../widgets/TouchableRect';
import { ReduxState } from '../../../types/ReduxTypes';

interface Props {
    loading: boolean;
    approverName: string;
    approverID: string;
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
    createGroup: (
        params: CreateGroupMutationVariables &
            DeleteApplicationMutationVariables & { approverID: string }
    ) => void;
}

export class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        tabBarVisible: false,
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
                                                name: `Group Chat with ${userData.name}`,
                                                id,
                                                approverID: this.props.approverID
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
                    />
                </View>
            </>
        );
    }
}

const bindActions = (dispatch) => ({
    createGroup: (params: CreateGroupMutationVariables & DeleteApplicationMutationVariables) =>
        dispatch(createGroup(params))
});

// @ts-ignore
export default connect(
    (state: ReduxState) => ({ approverName: state.profile.name, approverID: state.login.id }),
    bindActions
)(ApplicationDetail);
