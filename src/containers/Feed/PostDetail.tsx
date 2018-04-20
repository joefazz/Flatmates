import * as React from 'react';
import { compose, graphql, QueryProps } from 'react-apollo';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import {
    STAR_POST_MUTATION,
    UNSTAR_POST_MUTATION,
    UPDATE_POST_MUTATION
} from '../../graphql/mutations';
import {
    StarPostMutation,
    StarPostMutationVariables,
    UnstarPostMutation,
    UnstarPostMutationVariables,
    UpdatePostMutation,
    UpdatePostMutationVariables,
    BasicStarredQuery,
    CreateApplicationMutationVariables
} from '../../graphql/Types';
import { ProfileState, ReduxState } from '../../types/ReduxTypes';
import { House } from '../../types/Entities';
import Client from '../../Client';
import { USER_BASIC_STARRED_POSTS_QUERY } from '../../graphql/queries';
import { ApolloQueryResult } from 'apollo-client';
import { createApplication } from '../../redux/Routines';

interface Props {
    navigation: {
        state: {
            params: {
                data: {
                    id: string;
                };
                isStarred: boolean;
            };
        };
        push: (route: string, params: { id?: string; data?: object }) => void;
    };
    profile: ProfileState;
    id: string;
    createApplication: (params: CreateApplicationMutationVariables) => void;
    updatePost: (...UpdatePostMutationVariables) => { data: UpdatePostMutation } & QueryProps;
    starPost: (...StarPostMutationVariables) => StarPostMutation;
    unstarPost: (...UnstarPostMutationVariables) => UnstarPostMutation;
}

interface State {
    data: {
        id?: string;
        createdAt: string;
        lastSeen: string;
        createdBy: House;
        description: string;
        title: string;
    };
    isLoading: boolean;
    isStarred: boolean;
}

export class PostDetail extends React.Component<Props, State> {
    protected static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.createdBy.road,
        tabBarVisible: false
    });

    isStarred: boolean;

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: true,
            isStarred: props.navigation.state.params.isStarred
        };
    }

    componentDidMount() {
        this.getPostDetails();

        if (!this.state.isStarred) {
            this.hasStarredPost;
        }
    }

    render() {
        return (
            <>
                <StatusBar barStyle={'dark-content'} />
                <PostDetailComponent
                    userId={this.props.id}
                    firstName={this.props.profile.firstName}
                    title={this.state.data.title}
                    description={this.state.data.description}
                    house={this.state.data.createdBy}
                    createdAt={this.state.data.createdAt}
                    profile={this.props.profile}
                    lastSeen={this.state.data.lastSeen}
                    id={this.state.data.id}
                    isLoading={this.state.isLoading}
                    navigation={this.props.navigation}
                    starPost={this.starPost}
                    isStarred={this.state.isStarred}
                    createApplication={this.props.createApplication}
                />
            </>
        );
    }

    private hasStarredPost = async () => {
        try {
            const {
                data: {
                    user: { starredPosts }
                }
            }: ApolloQueryResult<BasicStarredQuery> = await Client.query<BasicStarredQuery>({
                query: USER_BASIC_STARRED_POSTS_QUERY,
                variables: { id: this.props.userId }
            });

            console.log(starredPosts);

            this.setState({
                isStarred: starredPosts.some((element) => {
                    return element.id === this.state.data.id;
                })
            });
            return true;
        } catch (error) {
            console.log('Error executing query');
            return false;
        }
    };

    private getPostDetails = async () => {
        try {
            const {
                data: { updatePost }
            } = await this.props.updatePost(
                this.props.navigation.state.params.data.id,
                new Date().toISOString()
            );

            const combinedData = Object.assign({}, this.state.data, updatePost);

            this.setState({ isLoading: false, data: combinedData });
        } catch (error) {
            console.log(
                'There was an error: ' +
                    error +
                    '... This will turn into a ui element eventually...'
            );
        }
    };

    private starPost = () => {
        if (!this.state.isStarred) {
            this.props.starPost(this.props.userId, this.props.navigation.state.params.data.id);
            this.isStarred = true;
        } else {
            this.props.unstarPost(this.props.userId, this.props.navigation.state.params.data.id);
            this.isStarred = false;
        }
    };
}

const updatePostMutation = graphql(UPDATE_POST_MUTATION, {
    props: ({ mutate }) => ({
        updatePost: (id, lastSeen) =>
            mutate({
                variables: {
                    id,
                    lastSeen
                }
            })
    })
});

const starPostMutation = graphql(STAR_POST_MUTATION, {
    props: ({ mutate }) => ({
        starPost: (id, postID) =>
            mutate({
                variables: {
                    id,
                    postID
                }
            })
    })
});

const unstarPostMutation = graphql(UNSTAR_POST_MUTATION, {
    props: ({ mutate }) => ({
        unstarPost: (id, postID) =>
            mutate({
                variables: {
                    id,
                    postID
                }
            })
    })
});

const mapStateToProps = (state: ReduxState) => ({
    profile: state.profile,
    id: state.login.id
});

const bindActions = (dispatch) => ({
    createApplication: (params: CreateApplicationMutationVariables) =>
        dispatch(createApplication(params))
});

export default compose(
    connect<{}, {}, Props>(mapStateToProps, bindActions),
    updatePostMutation,
    starPostMutation,
    unstarPostMutation
)(PostDetail);
