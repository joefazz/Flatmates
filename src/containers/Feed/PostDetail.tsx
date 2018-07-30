import React from 'react';
import { compose, graphql, QueryProps, ChildProps, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import {
    STAR_POST_MUTATION,
    UNSTAR_POST_MUTATION,
    UPDATE_POST_MUTATION,
    CREATE_APPLICATION_MUTATION
} from '../../graphql/mutations';
import {
    StarPostMutation,
    UnstarPostMutation,
    UpdatePostMutation,
    CreateApplicationMutationVariables,
    UserApplicationsQuery,
    CreateApplicationMutation
} from '../../graphql/Types';
import { ProfileState, ReduxState } from '../../types/ReduxTypes';
import { House, User } from '../../types/Entities';
import { USER_APPLICATIONS_QUERY } from '../../graphql/queries';

interface Props {
    navigation: {
        state: {
            params: {
                data: {
                    id: string;
                };
                isStarred: boolean;
                isReadOnly: boolean;
            };
        };
        push: (route: string, params: { id?: string; data?: object }) => void;
    };
    profile: ProfileState;
    id: string;
    userAppQuery: UserApplicationsQuery;
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
    userHasNoApplications: boolean;
    isLoading: boolean;
    isStarred: boolean;
    userHasAppliedToHouse: boolean;
}

export class PostDetail extends React.Component<Props, State> {
    static getDerivedStateFromProps(newProps, prevState) {
        let state = prevState;
        if (!newProps.navigation.state.params.isReadOnly) {
            if (!newProps.userAppQuery.loading && !prevState.userHasAppliedToHouse) {
                let appDoesExist = newProps.userAppQuery.user.applications.filter(
                    (app) => app.to.shortID === prevState.data.createdBy.shortID
                );

                state.userHasAppliedToHouse = Boolean(appDoesExist.length);
            }
            if (!newProps.userAppQuery.loading) {
                state.userHasNoApplications = !Boolean(newProps.userAppQuery.user.applicationAllowance);
            }
        }

        return state;
    }

    protected static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.createdBy.road,
        tabBarVisible: false
    });

    isStarred: boolean;

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            userHasNoApplications: true,
            isLoading: true,
            isStarred: props.navigation.state.params.isStarred,
            userHasAppliedToHouse: false
        };
    }

    componentDidMount() {
        this.getPostDetails();

        // if (!this.state.isStarred) {
        //     this.hasStarredPost;
        // }
    }

    render() {
        return (
            <>
                <PostDetailComponent
                    isReadOnly={this.props.navigation.state.params.isReadOnly}
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
                    userHasAppliedToHouse={this.state.userHasAppliedToHouse}
                    userHasNoApplications={this.state.userHasNoApplications}
                    // starPost={this.starPost}
                    isStarred={this.state.isStarred}
                    createApplication={this.createApplication}
                />
            </>
        );
    }

    private createApplication = (params: CreateApplicationMutationVariables) => {
        this.props.createApplication({ ...params });

        this.setState({ userHasAppliedToHouse: true });
    };

    // private hasStarredPost = async () => {
    //     try {
    //         const {
    //             data: {
    //                 user: { starredPosts }
    //             }
    //         }: ApolloQueryResult<BasicStarredQuery> = await Client.query<BasicStarredQuery>({
    //             query: USER_BASIC_STARRED_POSTS_QUERY,
    //             variables: { id: this.props.userId }
    //         });

    //         console.log(starredPosts);

    //         this.setState({
    //             isStarred: starredPosts.some((element) => {
    //                 return element.id === this.state.data.id;
    //             })
    //         });
    //         return true;
    //     } catch (error) {
    //         console.log('Error executing query');
    //         return false;
    //     }
    // };

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

    // private starPost = () => {
    //     if (!this.state.isStarred) {
    //         this.props.starPost(this.props.userId, this.props.navigation.state.params.data.id);
    //         this.isStarred = true;
    //     } else {
    //         this.props.unstarPost(this.props.userId, this.props.navigation.state.params.data.id);
    //         this.isStarred = false;
    //     }
    // };
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

// const starPostMutation = graphql(STAR_POST_MUTATION, {
//     props: ({ mutate }) => ({
//         starPost: (id, postID) =>
//             mutate({
//                 variables: {
//                     id,
//                     postID
//                 }
//             })
//     })
// });

// const unstarPostMutation = graphql(UNSTAR_POST_MUTATION, {
//     props: ({ mutate }) => ({
//         unstarPost: (id, postID) =>
//             mutate({
//                 variables: {
//                     id,
//                     postID
//                 }
//             })
//     })
// });

const createApplication = graphql(CREATE_APPLICATION_MUTATION, {
    props: ({ mutate }) => ({
        createApplication: (params: CreateApplicationMutationVariables) =>
            mutate({
                variables: { ...params },
                update: (store, { data: { createApplication } }) => {
                    const userData: UserApplicationsQuery = store.readQuery({
                        query: USER_APPLICATIONS_QUERY,
                        variables: {
                            id: params.userID
                        }
                    });

                    userData.user.applications.unshift(createApplication);
                    userData.user.applicationAllowance--;

                    store.writeQuery({
                        query: USER_APPLICATIONS_QUERY,
                        variables: {
                            id: params.userID
                        },
                        data: userData
                    });
                }
            })
    })
});

interface InputProps {
    id: string;
}

const hasAppliedToHouse = graphql(USER_APPLICATIONS_QUERY, {
    options: (ownProps: InputProps) => ({
        variables: { id: ownProps.id },
        fetchPolicy: 'network-only'
    }),
    props: ({ data: userAppQuery }) => ({
        userAppQuery
    })
});

const mapStateToProps = (state: ReduxState) => ({
    profile: state.profile,
    id: state.login.id
});

export default compose(
    connect(mapStateToProps),
    updatePostMutation,
    // starPostMutation,
    // unstarPostMutation,
    hasAppliedToHouse,
    createApplication
)(PostDetail);
