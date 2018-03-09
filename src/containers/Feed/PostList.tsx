import * as React from 'react';
import { compose } from 'react-apollo';
import { Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { getPosts } from '../../redux/Routines';
import { FeedState, LoginState } from '../../types/ReduxTypes';

interface Props {
    feed: FeedState,
    login: LoginState,
    navigation: {push: (route: string, params: {fbUserId?: string, data?: object}) => void},
    getPosts: (take?: number, skip?: number) => void
};

interface State {
    data: { toJS: () => Array<object> },
    isLoading: boolean,
    fbUserId: string
};

export class PostList extends React.Component<Props, State> {
    protected static defaultProps = {
        skip: 0
    };

    protected static navigationOptions = () => ({
        title: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.feed.get('posts'),
            isLoading: props.feed.get('isFetchingPosts'),
            fbUserId: '',
        };
    }

    componentDidMount() {
        this.props.getPosts();
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.feed.equals(this.props.feed) || newProps.feed.get('isFetchingPosts') !== this.state.isLoading) {
            this.setState({ isLoading: newProps.feed.get('isFetchingPosts') });

            if (newProps.feed.get('posts') !== this.state.data) {
                this.setState({ data: newProps.feed.get('posts') });
            }
        }

        if (newProps.login.get('fbUserId') !== null) {
            this.setState({ fbUserId: newProps.login.get('fbUserId') });
        }
    }

    render() {
        return (
            <>
                <StatusBar barStyle={'light-content'} />
                <PostListComponent navigation={this.props.navigation} loadMorePosts={this.loadMorePosts} refreshPostList={() => this.refreshPostList} {...this.state} />
            </>
        );
    }

    private loadMorePosts = () => {
        return;
    }

    private refreshPostList() {
        return this.props.getPosts();
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login'),
    feed: state.get('feed')
});

const bindActions = (dispatch) => {
    return {
        getPosts: (take, skip) => dispatch(getPosts(take, skip))
    };
};

export default compose(
    connect(mapStateToProps, bindActions)
)(PostList);