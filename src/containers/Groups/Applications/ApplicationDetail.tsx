import * as React from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import { ProfileComponent } from '../../../components/Profile/ProfileComponent';
import { User } from '../../../types/Entities';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { USER_DETAILS_QUERY } from '../../../graphql/queries';
import { graphql } from 'react-apollo';
import { TouchableRect } from '../../../widgets/TouchableRect';
import { toConstantHeight, toConstantWidth } from '../../../utils/PercentageConversion';
import { Colors } from '../../../consts';

interface Props {
    loading: boolean;
    user: User;
    navigation: {
        state: {
            params: {
                id: string;
                data: User;
            };
        };
    };
}

export class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        tabBarVisible: false,
        title: 'Application Detail'
    });

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <>
                <ProfileComponent
                    isLoading={this.props.loading}
                    profile={Object.assign(
                        {},
                        this.props.navigation.state.params.data,
                        this.props.user
                    )}
                />
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
                                `Chat with ${this.props.user.firstName}`,
                                'Are you sure you want to chat with ' + this.props.user.name + '?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancelled'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => console.log('GO TO CHAT')
                                    }
                                ]
                            )
                        }
                        title={`Chat with ${this.props.user.firstName}`}
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

const getUserDetail = graphql(USER_DETAILS_QUERY, {
    options: ({
        navigation
    }: {
        navigation: {
            state: {
                params: {
                    id: string;
                    data: User;
                };
            };
        };
    }) => ({
        variables: { id: navigation.state.params.data.id }
    }),
    props: ({ data }) => ({ ...data })
});

// @ts-ignore
export default getUserDetail(ApplicationDetail);
