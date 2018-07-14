import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Platform, View, ActivityIndicator } from 'react-native';
import { ProfileComponent } from '../components/Profile/ProfileComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { USER_DETAILS_QUERY } from '../graphql/queries';
import { LoginState, ProfileState } from '../types/ReduxTypes';
import { User } from '../types/Entities';
import { HeaderButtonIOS } from '../widgets';
import { FloatingAction } from 'react-native-floating-action';
import { Colors } from '../consts';

interface Props {
    profile: ProfileState;
    login: LoginState;
    loading: boolean;
    userDetailsQuery: () => void;
    navigation: {
        state: {
            params: {
                contentEditable: boolean;
            };
        };
        setParams: any;
    };
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
                !!navigation.state &&
                    !!navigation.state.params &&
                    !!navigation.state.params.contentEditable ? (
                        <HeaderButtonIOS
                            text={'Done'}
                            onPress={() => navigation.setParams({ contentEditable: false })}
                        />
                    ) : (
                        <HeaderButtonIOS
                            text={'Edit'}
                            onPress={() => navigation.setParams({ contentEditable: true })}
                        />
                    )
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
                <ProfileComponent
                    isLoading={this.state.isLoading}
                    profile={this.state.profile}
                    contentEditable={
                        (this.props.navigation.state &&
                            this.props.navigation.state.params &&
                            this.props.navigation.state.params.contentEditable) ||
                        false
                    }
                />
                {Platform.OS === 'android' &&
                    <FloatingAction
                        actions={[{
                            name: 'Edit',
                            icon: <Icon name={this.props.navigation.state &&
                                this.props.navigation.state.params &&
                                this.props.navigation.state.params.contentEditable ? 'md-checkmark' : 'md-create'} color={Colors.white} size={25} />
                        }]}
                        color={Colors.brandPrimaryColor}
                        overrideWithAction={true}
                        onPressItem={() => {
                            this.props.navigation.setParams({ contentEditable: !!this.props.navigation.state.params ? !this.props.navigation.state.params.contentEditable : true })
                        }}
                    />
                }
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

export default compose(
    connect(
        mapStateToProps,
        bindActions
    ),
    userDetailsQuery
)(Profile);
