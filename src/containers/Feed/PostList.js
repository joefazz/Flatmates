import React, { Fragment } from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { PostCard } from '../../widgets';
import { Colors, Metrics } from '../../consts';
import { POST_LIST_QUERY } from '../../graphql/queries';
import { feed } from '../../styles';

export class PostList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.posts,
            isLoading: props.loading,
            fbUserId: ''
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
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
})

const bindActions = (dispatch) => {
    return {
        
    };
}

const allPostsQuery = graphql(POST_LIST_QUERY, {
    options(props) {
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
        }
    }
});

export default compose(
    connect(mapStateToProps, bindActions),
    allPostsQuery,
)(PostList);