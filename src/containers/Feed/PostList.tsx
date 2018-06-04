import React from 'react';
import { compose, graphql, ChildProps } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { getPosts, toggleFilter } from '../../redux/Routines';
import { FeedState, LoginState, ReduxState } from '../../types/ReduxTypes';
import { Post } from '../../types/Entities';
import { USER_HOUSE_POST_QUERY } from '../../graphql/queries';
import { HousePostQuery, HousePostQueryVariables } from '../../graphql/Types';
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

    protected static navigationOptions = () => ({
        title: 'Flatmates'
    });

    constructor(props: Props) {
        super(props);

        this.state = {
            data: props.feed.posts,
            isLoading: props.feed.isFetchingPosts,
            userId: props.login.id,
            isAllFilterActive: props.feed.isAllFilterActive,
            isStarredFilterActive: props.feed.isStarredFilterActive,
            isPriceFilterActive: props.feed.isPriceFilterActive,
            hasCreatedPost: props.login.hasCreatedPost
        };
    }

    componentDidMount() {
        this.props.getPosts(5);
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.feed.isFetchingPosts !== this.state.isLoading) {
            this.setState({ isLoading: newProps.feed.isFetchingPosts });
        }

        if (newProps.feed.isAllFilterActive !== this.state.isAllFilterActive) {
            this.setState({ isAllFilterActive: newProps.feed.isAllFilterActive });
        }

        if (newProps.feed.isStarredFilterActive !== this.state.isStarredFilterActive) {
            this.setState({ isStarredFilterActive: newProps.feed.isStarredFilterActive });
        }

        if (newProps.feed.isPriceFilterActive !== this.state.isPriceFilterActive) {
            this.setState({ isPriceFilterActive: newProps.feed.isPriceFilterActive });
        }

        if (newProps.feed.posts.length !== this.state.data.length) {
            this.setState({ data: newProps.feed.posts });
        }
    }

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        let isPostingEnabled = false;

        if (this.props.user && this.props.user.house) {
            if (!this.props.user.house.post) {
                isPostingEnabled = true;
            }
        }

        return (
            <>
                <PostListComponent
                    navigation={this.props.navigation}
                    loadMorePosts={this.loadMorePosts}
                    changeFilters={this.changeFilters}
                    refreshPostList={this.refreshPostList}
                    userPostPermissionEnabled={isPostingEnabled}
                    {...this.state}
                />
            </>
        );
    }

    private changeFilters = (filterSelected: Filters): void => {
        if (
            filterSelected === Filters.ALL &&
            (!this.state.isStarredFilterActive && !this.state.isPriceFilterActive)
        ) {
            return;
        } else if (
            filterSelected === Filters.STARRED &&
            (!this.state.isAllFilterActive && !this.state.isPriceFilterActive)
        ) {
            return;
        } else if (
            filterSelected === Filters.MINE &&
            (!this.state.isStarredFilterActive && !this.state.isAllFilterActive)
        ) {
            return;
        }
        this.props.toggleFilter(filterSelected);
    };

    private loadMorePosts = () => {
        return;
    };

    private refreshPostList = () => {
        return this.props.getPosts(5);
    };
}

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    feed: state.feed
});

const bindActions = (dispatch) => {
    return {
        getPosts: (take) => dispatch(getPosts(take)),
        toggleFilter: (filter) => dispatch(toggleFilter(filter))
    };
};

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
        bindActions
    ),
    housePost
)(PostList);
