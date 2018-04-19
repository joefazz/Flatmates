import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { ProfileComponent } from '../../../components/Profile/ProfileComponent';
import { User } from '../../../types/Entities';
import { USER_DETAILS_QUERY } from '../../../graphql/queries';
import { graphql } from 'react-apollo';

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

class ApplicationDetail extends React.Component<Props> {
    static navigationOptions = () => ({
        tabBarVisible: false,
        title: 'Application Detail'
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
export default getUserDetail(ApplicationDetail);
