import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { POST_LIST_QUERY } from '../../graphql/queries';

interface Props {
    posts: Array<object>,
    loading: boolean,
    loadMorePosts: () => object,
    login: object,
    navigation: object,
    skip: number
};

interface State {
    data: Array<object>,
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
            data: props.posts,
            isLoading: props.loading,
            fbUserId: ''
        };
    }

    public componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({ isLoading: newProps.loading });

            if (newProps.allPosts !== this.state.data) {
                this.setState({ data: newProps.allPosts });
            }
        }

        if (newProps.login.get('fbUserId') !== null) {
            this.setState({ fbUserId: newProps.login.get('fbUserId') });
        }
    }

    public render() {
        return (
            <React.Fragment>
                <StatusBar barStyle={'light-content'} />
                <PostListComponent navigation={this.props.navigation} loadMorePosts={this.props.loadMorePosts} {...this.state} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login')
});

const bindActions = () => {
    return {};
};

const allPostsQuery = graphql(POST_LIST_QUERY, {
    options() {
        return {
            variables: {
                take: 2,
                skip: 0
            }
        };
    },
    props({ data: { loading, allPosts, fetchMore } }) {
        return {
            loading,
            allPosts,
            loadMorePosts() {
                return fetchMore({
                    variables: { skip: allPosts.length },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        return Object.assign({}, prevResult, {
                            posts: [...prevResult.allPosts, ...fetchMoreResult.allPosts]
                        });
                    }
                });
            }
        };
    }
});

export default compose(
    connect(mapStateToProps, bindActions),
    allPostsQuery,
)(PostList);