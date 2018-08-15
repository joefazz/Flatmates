import React from 'react';
import moment from 'moment';
import { graphql, ChildProps } from 'react-apollo';
import { ActivityIndicator, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileComponent } from '../../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../../graphql/queries';
import { User } from '../../types/Entities';
import { UserDetailQuery, UserDetailQueryVariables } from '../../graphql/Types';
import { TRACKER } from '../../App';
import { ErrorScreen } from '../../widgets/ErrorScreen';
import { ErrorToast } from '../../widgets/ErrorToast';
import { Colors } from '../../consts';

interface Props {
    loading: boolean;
    error: Error;
    user: User;
    refetch: () => void;
    navigation: {
        state: {
            params: {
                id: string;
                data: User;
            };
        };
    };
}

export class UserProfile extends React.Component<Props> {
    protected static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.name,
        tabBarVisible: false,
        headerRight: (
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
    START_TIME = moment().unix();

    componentDidMount() {
        TRACKER.trackScreenView('UserProfile');
    }

    componentWillUnmount() {
        TRACKER.trackTiming('Session', moment().unix() - this.START_TIME, {
            name: 'Profile',
            label: 'OtherUserProfile'
        });
    }

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        if (this.props.error) {
            return <ErrorScreen message={this.props.error.message} onPress={this.props.refetch} />;
        }

        return (
            <>
                {this.props.error && (
                    <ErrorToast message={this.props.error.message} onPress={this.props.refetch} />
                )}
                <ProfileComponent
                    isLoading={this.props.loading}
                    profile={Object.assign(
                        {},
                        this.props.navigation.state.params.data,
                        this.props.user
                    )}
                />
            </>
        );
    }
}

interface InputProps {
    navigation: {
        state: {
            params: {
                id: string;
                data: User;
            };
        };
    };
}

const getUserDetail = graphql<
    InputProps,
    UserDetailQuery,
    UserDetailQueryVariables,
    ChildProps<UserDetailQuery>
>(USER_DETAILS_QUERY, {
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
        variables: { id: navigation.state.params.id }
    }),
    props: ({ data: { loading, error, user, refetch } }) => ({ loading, error, user })
});

export default getUserDetail(UserProfile);
