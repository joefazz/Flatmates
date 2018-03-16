import * as React from "react";
import { compose } from "react-apollo";
import { Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { PostListComponent } from "../../components/Feed/PostListComponent";
import { getPosts } from "../../redux/Routines";
import { FeedState, LoginState, ReduxState } from "../../types/ReduxTypes";
import { Post } from "../../types/Entities";

interface Props {
    feed: FeedState;
    login: LoginState;
    navigation: { push: (route: string, params: { fbUserId?: string; data?: object }) => void };
    getPosts: (take?: number, skip?: number) => void;
}

interface State {
    data: Array<Post>;
    isLoading: boolean;
    hasCreatedPost: boolean;
    fbUserId: string;
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
            hasCreatedPost: props.login.hasCreatedPost
        };
    }

    componentDidMount() {
        this.props.getPosts();
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.feed.isFetchingPosts !== this.state.isLoading) {
            this.setState({ isLoading: newProps.feed.isFetchingPosts });

            if (newProps.feed.posts !== this.state.data) {
                this.setState({ data: newProps.feed.posts });
            }
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
                    refreshPostList={() => this.refreshPostList}
                    {...this.state}
                />
            </>
        );
    }

    private loadMorePosts = () => {
        return;
    };

    private refreshPostList() {
        return this.props.getPosts();
    }
}

const mapStateToProps = (state: ReduxState) => ({
    login: state.login,
    feed: state.feed
});

const bindActions = (dispatch) => {
    return {
        getPosts: (take, skip) => dispatch(getPosts(take, skip))
    };
};

export default compose(connect(mapStateToProps, bindActions))(PostList);
