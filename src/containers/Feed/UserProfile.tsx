import * as React from "react";
import { graphql, QueryProps } from "react-apollo";
import { ActivityIndicator } from "react-native";
import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import { USER_DETAILS_QUERY } from "../../graphql/queries";
import { User } from "../../types/Types";

type Props = Response & QueryProps & InputProps;

interface Response {
    user: User;
}

interface InputProps {
    navigation: {
        state: {
            params: {
                fbUserId: string;
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
                profile={Object.assign({}, this.props.navigation.state.params.data, this.props.user)}
            />
        );
    }
}

const getUserDetail = graphql<Response, InputProps, Props>(USER_DETAILS_QUERY, {
    options: ({ navigation }) => ({
        variables: { facebookUserId: navigation.state.params.fbUserId }
    }),
    props: ({ data }) => ({ ...data })
});

export default getUserDetail(UserProfile);
