import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Platform, StatusBar, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ProfileComponent } from '../components/Profile/ProfileComponent';
import { USER_DETAILS_QUERY } from '../graphql/queries';
import { LoginState, ProfileState } from '../types/ReduxTypes';
import { User } from '../types/Entities';
import { EditButton } from '../widgets';

interface Props {
    profile: ProfileState;
    login: LoginState;
    loading: boolean;
    userDetailsQuery: () => void;
}

interface State {
    isLoading: boolean;
    profile: User;
}

export class Profile extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight:
            Platform.OS === 'ios' ? (
                <EditButton onPress={() => navigation.navigate('EditProfile')} />
            ) : null
    });

    constructor(props) {
        super(props);

        this.state = {
            profile: props.profile,
            isLoading: props.loading
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.props.loading && newProps.user) {
            // Remove null properties
            const trimmedData: { house?: { users: Array<User> } } = {};

            Object.keys(newProps.user).map((property) => {
                if (newProps.user[property] !== null) {
                    trimmedData[property] = newProps.user[property];
                }
            });

            if (trimmedData.house) {
                const trimmedusers = trimmedData.house.users.filter((user) => {
                    return user.name !== this.state.profile.name;
                });

                const tempHouse: { users?: Array<any> } = {};
                Object.keys(trimmedData.house).map((property) => {
                    tempHouse[property] =
                        property === 'users' ? trimmedusers : trimmedData.house[property];
                });
                trimmedData.house = tempHouse as { users: Array<User> };
            }

            this.setState({
                isLoading: newProps.loading,
                profile: Object.assign({}, this.state.profile, trimmedData)
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={'dark-content'} />
                <ProfileComponent isLoading={this.state.isLoading} profile={this.state.profile} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    profile: state.profile
});

const bindActions = () => {
    return {};
};

const userDetailsQuery = graphql(USER_DETAILS_QUERY, {
    options: (ownProps: Props) => ({ variables: { id: ownProps.login.id } }),

    // @ts-ignore
    props: ({ data: { loading, user } }) => ({
        loading,
        user
    })
});

export default compose(connect(mapStateToProps, bindActions), userDetailsQuery)(Profile);
