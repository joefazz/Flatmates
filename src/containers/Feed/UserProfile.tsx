import React from 'react';
import moment from 'moment';
import { graphql, ChildProps } from 'react-apollo';
import { ActivityIndicator, Text } from 'react-native';
import { ProfileComponent } from '../../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../../graphql/queries';
import { User } from '../../types/Entities';
import { UserDetailQuery, UserDetailQueryVariables } from '../../graphql/Types';
import { TRACKER } from '../../App';
import { ErrorScreen } from '../../widgets/ErrorScreen';
import { ErrorToast } from '../../widgets/ErrorToast';

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
        tabBarVisible: false
    })
    START_TIME = moment().unix();

    componentDidMount() {
        TRACKER.trackScreenView('UserProfile');
    }

    componentWillUnmount() {
        TRACKER.trackTiming('Session', moment().unix() - this.START_TIME, { name: 'Profile', label: 'OtherUserProfile' });
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
                {this.props.error && <ErrorToast message={this.props.error.message} onPress={this.props.refetch} />}
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
