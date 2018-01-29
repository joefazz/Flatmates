import React, { Fragment } from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostListComponent } from '../../components/Feed/PostListComponent';
import { CreateButton, PostCard } from '../../widgets';
import { Colors, Metrics } from '../../consts';
import { POST_LIST_QUERY } from '../../graphql/queries';
import { feed } from '../../styles';

export class PostList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerRight: Platform.OS === 'ios' ? <CreateButton onPress={() => navigation.navigate('CreatePost')} /> : null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.allPosts,
            isLoading: props.loading
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({ isLoading: newProps.loading });

            if (newProps.posts !== this.state.posts) {
                this.setState({ data: newProps.posts });
            }
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
    props({ data: { loading, posts, fetchMore } }) {
        return {
            loading, 
            posts,
            loadMorePosts() {
                return fetchMore({
                    variables: { skip: posts.length },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        return Object.assign({}, prevResult, {
                            posts: [...prevResult.posts, ...fetchMoreResult.posts]
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