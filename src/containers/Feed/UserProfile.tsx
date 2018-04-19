import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import { ProfileComponent } from '../../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../../graphql/queries';
import { User } from '../../types/Entities';

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

export class UserProfile extends React.Component<Props> {
    protected static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.name,
        tabBarVisible: false
    });

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <ProfileComponent
                isLoading={this.props.loading}
                profile={Object.assign(
                    {},
                    this.props.navigation.state.params.data,
                    this.props.user
                )}
            />
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
        variables: { id: navigation.state.params.id }
    }),
    props: ({ data }) => ({ ...data })
});

// @ts-ignore
export default getUserDetail(UserProfile);
