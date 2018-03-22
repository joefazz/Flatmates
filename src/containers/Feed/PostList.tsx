import * as React from "react";
import { compose } from "react-apollo";
import { Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { PostListComponent } from "../../components/Feed/PostListComponent";
import { getPosts, toggleFilter } from "../../redux/Routines";
import { FeedState, LoginState, ReduxState } from "../../types/ReduxTypes";
import { Post } from "../../types/Entities";

interface Props {
    feed: FeedState;
    login: LoginState;
    navigation: { push: (route: string, params: { fbUserId?: string; data?: object }) => void };
    getPosts: (take: number) => void;
    toggleFilter: (Filters) => void;
}

interface State {
    data: Array<Post>;
    isLoading: boolean;
    hasCreatedPost: boolean;
    fbUserId: string;
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
        title: "Home",
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={Platform.OS === "ios" ? (focused ? "ios-home" : "ios-home-outline") : "md-home"}
                color={tintColor}
                size={32}
            />
        )
    });

    constructor(props: Props) {
        super(props);

        this.state = {
            data: props.feed.posts,
            isLoading: props.feed.isFetchingPosts,
            fbUserId: "",
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

            if (newProps.feed.posts !== this.state.data) {
                this.setState({ data: newProps.feed.posts });
            }
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

        if (newProps.login.fbUserId !== null) {
            this.setState({ fbUserId: newProps.login.fbUserId });
        }
    }

    render() {
        return (
            <>
                <StatusBar barStyle={"light-content"} />
                <PostListComponent
                    navigation={this.props.navigation}
                    loadMorePosts={this.loadMorePosts}
                    changeFilters={this.changeFilters}
                    refreshPostList={this.refreshPostList}
                    {...this.state}
                />
            </>
        );
    }

    private changeFilters = (filterSelected: Filters): void => {
        if (filterSelected === Filters.ALL && (!this.state.isStarredFilterActive && !this.state.isPriceFilterActive)) {
            return;
        } else if (filterSelected === Filters.STARRED && (!this.state.isAllFilterActive && !this.state.isPriceFilterActive)) {
            return;
        } else if (filterSelected === Filters.MINE && (!this.state.isStarredFilterActive && !this.state.isAllFilterActive)) {
            return;
        }
        this.props.toggleFilter(filterSelected);
    };

    private loadMorePosts = () => {
        return;
    };

    private refreshPostList = () => {
        return this.props.getPosts(5);
    }
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

export default compose(connect(mapStateToProps, bindActions))(PostList);
