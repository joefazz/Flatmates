import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { POST_LIST_QUERY } from '../../graphql/queries';

type Props = {
    posts: Array<Object>,
    loading: boolean,
    loadMorePosts: Function,
    login: Object,
    navigation: Object,
    skip: number
};

type State = {
    data: Array<Object>,
    isLoading: boolean,
    fbUserId: string
};

export class PostList extends React.Component<Props, State> {
    static navigationOptions = () => ({
        title: 'Home',
    });

    static defaultProps = {
        skip: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.posts,
            isLoading: props.loading,
            fbUserId: ''
        };
    }

    componentWillReceiveProps(newProps) {
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

    render() {
        return (
            <Fragment>
                <StatusBar barStyle={'light-content'} />
                <PostListComponent navigation={this.props.navigation} loadMorePosts={this.props.loadMorePosts} {...this.state} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.get('login')
});

const bindActions = () => {
    return {
        
    };
};

const allPostsQuery = graphql(POST_LIST_QUERY, {
    options(props) {
        return {
            variables: {
                take: 2,
                skip: props.skip
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