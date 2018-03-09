import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import { ProfileComponent } from '../../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../../graphql/queries';
import { UserDetailQuery } from '../../graphql/Types';
import { ProfileState } from '../../types/ReduxTypes';

interface Props {
    profile: ProfileState;
    data: QueryProps<UserDetailQuery>
}

export class UserProfile extends React.Component<Props> {
    render() {
        if (this.props.data.loading) {
            return <ActivityIndicator />;
        }

        console.log(this.props.data);
        return (
            <>
                <ProfileComponent isLoading={this.props.data.loading} profile={this.props.data} />
            </>
        );
    }
}

export default graphql(USER_DETAILS_QUERY,
    {
        options: ({ navigation }) => ({ variables: { facebookUserId: navigation.state.params.id } })
    }
)(UserProfile);