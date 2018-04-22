import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ProfileComponent } from '../../../components/Profile/ProfileComponent';
import { Colors } from '../../../consts';
import { CreateGroupDeleteApplicationMutationVariables } from '../../../graphql/Types';
import { USER_DETAILS_QUERY } from '../../../graphql/queries';
import { createGroup } from '../../../redux/Routines';
import { User } from '../../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { TouchableRect } from '../../../widgets/TouchableRect';

interface Props {
    loading: boolean;
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
    createGroup: (params: CreateGroupDeleteApplicationMutationVariables) => void;
}

export class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        tabBarVisible: false,
        title: 'Application Detail'
    });

    render() {
        const { id, userData, houseUserIDs } = this.props.navigation.state.params;
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
                                                applicationID: id,
                                                applicantID: userData.id,
                                                houseUserIDs,
                                                name: `Group Chat with ${userData.name}`
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
    createGroup: (params: CreateGroupDeleteApplicationMutationVariables) =>
        dispatch(createGroup(params))
});

// @ts-ignore
export default connect((state) => ({}), bindActions)(ApplicationDetail);
