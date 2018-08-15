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
import { UPDATE_USER_MUTATION } from '../graphql/mutations';
import { UpdateUserMutationVariables, UserDetailQuery, UpdateUserMutation } from '../graphql/Types';
import { ErrorScreen } from '../widgets/ErrorScreen';
import { ErrorToast } from '../widgets/ErrorToast';
import { ApolloError } from 'apollo-client';

interface Props {
    profile: ProfileState;
    login: LoginState;
    error: ApolloError;
    refetch: () => void;
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
    user: User;
    updateUser: (
        params: UpdateUserMutationVariables & { tempProfilePicture: string }
    ) => UpdateUserMutation;
}

interface State {
    isLoading: boolean;
    profile: User;
}

export class Profile extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight:
            Platform.OS === 'ios' &&
            (!!navigation.state &&
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
            ))
    });

    constructor(props) {
        super(props);

        this.state = {
            profile: props.profile,
            isLoading: props.loading
        };
    }

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        if (this.props.error && this.props.user === undefined) {
            return <ErrorScreen message={this.props.error.message} onPress={this.props.refetch} />;
        }

        return (
            <>
                {this.props.error && (
                    <ErrorToast message={this.props.error.message} onPress={this.props.refetch} />
                )}
                <View style={{ flex: 1 }}>
                    <ProfileComponent
                        isLoading={this.state.isLoading}
                        profile={this.props.user}
                        updateUser={this.props.updateUser}
                        navigation={this.props.navigation}
                        contentEditable={
                            (this.props.navigation.state &&
                                this.props.navigation.state.params &&
                                this.props.navigation.state.params.contentEditable) ||
                            false
                        }
                    />
                    {Platform.OS === 'android' && (
                        <FloatingAction
                            actions={[
                                {
                                    name: 'Edit',
                                    icon: (
                                        <Icon
                                            name={
                                                this.props.navigation.state.params &&
                                                this.props.navigation.state.params.contentEditable
                                                    ? 'md-checkmark'
                                                    : 'md-create'
                                            }
                                            color={Colors.white}
                                            size={25}
                                        />
                                    )
                                }
                            ]}
                            color={Colors.brandPrimaryColor}
                            overrideWithAction={true}
                            onPressItem={() => {
                                this.props.navigation.setParams({
                                    contentEditable: !!this.props.navigation.state.params
                                        ? !this.props.navigation.state.params.contentEditable
                                        : true
                                });
                            }}
                        />
                    )}
                </View>
            </>
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
    options: (ownProps: Props) => ({
        variables: { id: ownProps.login.id },
        fetchPolicy: 'network-only'
    }),

    // @ts-ignore
    props: ({ data: { loading, user, error, refetch } }) => ({
        loading,
        user,
        error,
        refetch
    })
});

const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        updateUser: (params: UpdateUserMutationVariables & { tempProfilePicture: string }) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { updateUser } }) => {
                    const userData: UserDetailQuery = store.readQuery({
                        query: USER_DETAILS_QUERY,
                        variables: { id: params.id }
                    });

                    let data = Object.assign(userData.user, updateUser);

                    store.writeQuery({
                        query: USER_DETAILS_QUERY,
                        variables: { id: params.id },
                        data: { user: data }
                    });
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateUser: {
                        __typename: 'User',
                        id: params.id,
                        name: params.name,
                        firstName: params.firstName,
                        lastName: params.lastName,
                        profilePicture: params.tempProfilePicture,
                        age: params.age,
                        course: params.course,
                        bio: params.bio,
                        gender: params.gender,
                        studyYear: params.studyYear,
                        isSmoker: params.isSmoker,
                        isDruggie: params.isDruggie,
                        isDrinker: params.isDrinker
                    }
                }
            })
    })
});

export default compose(
    connect(
        mapStateToProps,
        bindActions
    ),
    userDetailsQuery,
    updateUserMutation
)(Profile);
