import React from 'react';
import { compose, graphql, ChildProps, Query } from 'react-apollo';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ApolloError } from 'apollo-client';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { FeedState, LoginState, ReduxState } from '../../types/ReduxTypes';
import { Post } from '../../types/Entities';
import { USER_HOUSE_POST_QUERY, POST_LIST_QUERY } from '../../graphql/queries';
import { HousePostQuery, HousePostQueryVariables, AllPostsQuery, AllPostsQueryVariables } from '../../graphql/Types';
import { HOUSE_POST_QUERY } from '../../graphql/queries';
import { Colors } from '../../consts';

interface Props {
    feed: FeedState;
    login: LoginState;
    user: {
        house: {
            post: {
                id: string;
                description: string;
                lastSeen: string | null;
            } | null;
        } | null;
    };
    loading: boolean;

    navigation: { push: (route: string, params: { fbUserId?: string; data?: object }) => void };
    getPosts: (take: number) => void;
    toggleFilter: (Filters) => void;
}

interface State {
    data: Array<Post>;
    isLoading: boolean;
    hasCreatedPost: boolean;
    userId: string;
    isAllFilterActive: boolean;
    isPriceFilterActive: boolean;
    isStarredFilterActive: boolean;
}

export enum Filters {
    ALL,
    MINE,
    STARRED
}

export class PostList extends React.Component<Props, State> {
    protected static defaultProps = {
        skip: 0
    };

    protected static navigationOptions = ({ navigation }) => ({
        title: 'Flatmates',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ marginRight: 10 }}>
                <Icon name={'ios-help-circle-outline'} size={28} color={Colors.white} />
            </TouchableOpacity>
        )
    });

    render() {
        let isPostingEnabled = false;

        if (this.props.user && this.props.user.house) {
            if (!this.props.user.house.post) {
                isPostingEnabled = true;
            }
        }

        return (
            <Query query={POST_LIST_QUERY} variables={{ take: 10, skip: 0 }} fetchPolicy={'cache-and-network'}>
                {({ data, loading, error, fetchMore, refetch }: { data: AllPostsQuery; loading: boolean; error: ApolloError; fetchMore: any; refetch: () => void; }) => {

                    if (error) {
                        return <Text>{error.message} please try again.</Text>
                    }

                    return (
                        <PostListComponent
                            fetchMorePosts={() => fetchMore({
                                variables: { take: 10, skip: data.allPosts.length }, updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) {
                                        return prev;
                                    }

                                    return Object.assign({}, prev, {
                                        allPosts: [...prev.allPosts, ...fetchMoreResult.allPosts]
                                    });
                                }
                            })}
                            isLoading={loading}
                            navigation={this.props.navigation}
                            refreshPostList={refetch}
                            canFetchMorePosts={!!data.allPosts && data.allPosts.length % 10 === 0}
                            userPostPermissionEnabled={true}
                            data={!!data.allPosts ? data.allPosts : []}
                            userId={this.props.login.id}
                        />
                    )
                }

                }
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
});

interface InputProps {
    login: LoginState;
}

const housePost = graphql<
    InputProps,
    HousePostQuery,
    HousePostQueryVariables,
    ChildProps<HousePostQuery>
    >(USER_HOUSE_POST_QUERY, {
        options: (props) => {
            return { variables: { id: props.login.id } };
        },

        props: ({ data: { loading, user, error } }) => ({
            loading,
            user,
            error
        })
    });

export default compose(
    connect(
        mapStateToProps,
        {}
    ),
    housePost
)(PostList);
