import React from 'react';
import moment from 'moment';
import { compose, graphql, ChildProps, Query } from 'react-apollo';
import { TouchableOpacity, Text, Platform, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApolloError } from 'apollo-client';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { FeedState, LoginState, ReduxState, ProfileState } from '../../types/ReduxTypes';
import { Post } from '../../types/Entities';
import { POST_LIST_QUERY } from '../../graphql/queries';
import {
    HousePostQuery,
    HousePostQueryVariables,
    AllPostsQuery,
    AllPostsQueryVariables
} from '../../graphql/Types';
import { HOUSE_POST_QUERY } from '../../graphql/queries';
import { Colors } from '../../consts';
import { FontFactory } from '../../consts/font';
import { TRACKER } from '../../App';
import { ErrorScreen } from '../../widgets/ErrorScreen';
import { ErrorToast } from '../../widgets/ErrorToast';
import { warningRead } from '../../redux/Routines';

interface Props {
    login: LoginState;
    profile: ProfileState;
    toggleWarning: () => void;
    navigation: { push: (route: string) => void; state: { params: { isReadOnly?: boolean } } };
}

export enum Filters {
    ALL,
    MINE,
    STARRED
}

export class PostList extends React.Component<Props> {
    protected static defaultProps = {
        skip: 0
    };

    protected static navigationOptions = ({ navigation }) => {
        if (Platform.OS === 'android') {
            return {
                title: 'Flatmates'
            };
        } else {
            return {
                title: 'Flatmates',
                headerLeft: navigation.state.params && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Icon name={'ios-arrow-back'} size={32} color={Colors.white} />
                        <Text
                            style={{
                                fontSize: 18,
                                color: Colors.white,
                                marginLeft: 10,
                                marginBottom: 3
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('About')}
                        style={{ marginRight: 10 }}
                    >
                        <Icon name={'md-help-circle'} size={28} color={Colors.white} />
                    </TouchableOpacity>
                )
            };
        }
    };

    START_TIME = moment().unix();

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
        TRACKER.trackScreenView('PostList');

        if (this.props.login.id !== '' && !this.props.login.hasSeenWarning) {
            Alert.alert(
                'Note',
                "Flatmates is just a platform for people to connect in order to help find housing and provide some structure to the process.\n\n Just because someone has accepted your application to be a housemate on here doesn't mean that you don't have to sign a contract, pay a deposit etcetra.\n\n Never hand over any money to anyone other than an estate agent, make good decisions and you'll be fine.",
                [{ text: 'OK', onPress: () => this.props.toggleWarning() }]
            );
        }
    }

    componentWillUnmount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.isReadOnly) {
            StatusBar.setBarStyle('dark-content');
        }
        TRACKER.trackTiming('Session', moment().unix() - this.START_TIME, {
            name: 'PostList',
            label: 'PostList'
        });
    }

    render() {
        if (!!this.props.profile.house && this.props.profile.house.shortID !== 0) {
            return (
                <Query
                    query={HOUSE_POST_QUERY}
                    variables={{ shortID: this.props.profile.house.shortID }}
                    fetchPolicy={'cache-and-network'}
                >
                    {({
                        data: createData,
                        loading: createLoading,
                        error: createError
                    }: {
                        data: HousePostQuery;
                        loading: boolean;
                        error?: ApolloError;
                    }) => {
                        return (
                            <Query
                                query={POST_LIST_QUERY}
                                variables={{ take: 10, skip: 0 }}
                                fetchPolicy={'cache-and-network'}
                            >
                                {({
                                    data,
                                    loading,
                                    error,
                                    fetchMore,
                                    refetch
                                }: {
                                    data: AllPostsQuery;
                                    loading: boolean;
                                    error?: ApolloError;
                                    fetchMore: any;
                                    refetch: () => void;
                                }) => {
                                    if (error) {
                                        return (
                                            <ErrorScreen
                                                message={error.message}
                                                onPress={refetch}
                                            />
                                        );
                                    }

                                    return (
                                        <>
                                            {error && (
                                                <ErrorToast
                                                    message={error.message}
                                                    onPress={refetch}
                                                />
                                            )}

                                            <PostListComponent
                                                fetchMorePosts={() =>
                                                    fetchMore({
                                                        variables: {
                                                            take: 10,
                                                            skip: data.allPosts.length
                                                        },
                                                        updateQuery: (
                                                            prev,
                                                            { fetchMoreResult }
                                                        ) => {
                                                            if (!fetchMoreResult) {
                                                                return prev;
                                                            }

                                                            return Object.assign({}, prev, {
                                                                allPosts: [
                                                                    ...prev.allPosts,
                                                                    ...fetchMoreResult.allPosts
                                                                ]
                                                            });
                                                        }
                                                    })
                                                }
                                                isLoading={loading}
                                                navigation={this.props.navigation}
                                                refreshPostList={refetch}
                                                canFetchMorePosts={
                                                    !!data.allPosts &&
                                                    data.allPosts.length % 10 === 0 &&
                                                    data.allPosts.length !== 0
                                                }
                                                userPostPermissionEnabled={
                                                    this.props.navigation.state.params &&
                                                    this.props.navigation.state.params.isReadOnly
                                                        ? false
                                                        : !(createLoading || loading)
                                                        ? !!createData
                                                            ? !!createData.house
                                                                ? createData.house.spaces > 0
                                                                    ? !Boolean(
                                                                          createData.house.post
                                                                      )
                                                                    : false
                                                                : false
                                                            : false
                                                        : false
                                                }
                                                data={!!data.allPosts ? data.allPosts : []}
                                                userId={this.props.login.id}
                                            />
                                        </>
                                    );
                                }}
                            </Query>
                        );
                    }}
                </Query>
            );
        }

        return (
            <Query
                query={POST_LIST_QUERY}
                variables={{ take: 10, skip: 0 }}
                fetchPolicy={'cache-and-network'}
            >
                {({
                    data,
                    loading,
                    error,
                    fetchMore,
                    refetch
                }: {
                    data: AllPostsQuery;
                    loading: boolean;
                    error?: ApolloError;
                    fetchMore: any;
                    refetch: () => void;
                }) => {
                    if (error && (!Boolean(data) || !Boolean(data.allPosts))) {
                        return <ErrorScreen message={error.message} onPress={refetch} />;
                    }

                    return (
                        <>
                            {error && <ErrorToast message={error.message} onPress={refetch} />}
                            <PostListComponent
                                fetchMorePosts={() =>
                                    fetchMore({
                                        variables: { take: 10, skip: data.allPosts.length },
                                        updateQuery: (prev, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) {
                                                return prev;
                                            }

                                            return Object.assign({}, prev, {
                                                allPosts: [
                                                    ...prev.allPosts,
                                                    ...fetchMoreResult.allPosts
                                                ]
                                            });
                                        }
                                    })
                                }
                                isLoading={loading}
                                navigation={this.props.navigation}
                                refreshPostList={refetch}
                                canFetchMorePosts={
                                    !!data.allPosts && data.allPosts.length % 10 === 0
                                }
                                userPostPermissionEnabled={
                                    !(this.props.loading && loading) ||
                                    !!(
                                        this.props.navigation.state.params &&
                                        this.props.navigation.state.params.isReadOnly
                                    )
                                        ? false
                                        : !!this.props.user.house
                                        ? !Boolean(this.props.user.house.post)
                                        : false
                                }
                                data={!!data.allPosts ? data.allPosts : []}
                                userId={this.props.login.id}
                            />
                        </>
                    );
                }}
            </Query>
        );
    }

    // private changeFilters = (filterSelected: Filters): void => {
    //     if (
    //         filterSelected === Filters.ALL &&
    //         (!this.state.isStarredFilterActive && !this.state.isPriceFilterActive)
    //     ) {
    //         return;
    //     } else if (
    //         filterSelected === Filters.STARRED &&
    //         (!this.state.isAllFilterActive && !this.state.isPriceFilterActive)
    //     ) {
    //         return;
    //     } else if (
    //         filterSelected === Filters.MINE &&
    //         (!this.state.isStarredFilterActive && !this.state.isAllFilterActive)
    //     ) {
    //         return;
    //     }
    //     this.props.toggleFilter(filterSelected);
    // };
}

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    profile: state.profile
});

const bindActions = (dispatch) => ({
    toggleWarning: () => dispatch(warningRead())
});

export default connect(
    mapStateToProps,
    bindActions
)(PostList);
