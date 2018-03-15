import * as React from "react";
import { compose, graphql, QueryProps } from "react-apollo";
import { StatusBar } from "react-native";
import { connect } from "react-redux";

import { PostDetailComponent } from "../../components/Feed/PostDetailComponent";
import { STAR_POST_MUTATION, UNSTAR_POST_MUTATION, UPDATE_POST_MUTATION } from "../../graphql/mutations";
import {
    StarPostMutation,
    StarPostMutationVariables,
    UnstarPostMutation,
    UnstarPostMutationVariables,
    UpdatePostMutation,
    UpdatePostMutationVariables
} from "../../graphql/Types";
import { ProfileState } from "../../types/ReduxTypes";
import { House } from "../../types/Types";

interface Props {
    navigation: {
        state: {
            params: {
                data: {
                    id: string;
                };
            };
        };
        push: (route: string, params: { fbUserId?: string; data?: object }) => void;
    };
    profile: ProfileState;
    userId: string;
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
}

export class PostDetail extends React.Component<Props, State> {
    protected static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.createdBy.road,
        tabBarVisible: false
    });

    isStarred: boolean;

    // TODO: FIND A WAY TO CONNECT THIS SCREEN TO STATE SO I CAN USE PROFILE TO COMPARE AND GET PERCENTAGE
    constructor(props) {
        super(props);

        this.isStarred = false;

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: true
        };
    }

    getPostDetails = async () => {
        try {
            console.log(this.props.navigation.state.params.data.id, new Date().toISOString());
            const { data: { updatePost } } = await this.props.updatePost(
                this.props.navigation.state.params.data.id,
                new Date().toISOString()
            );

            const combinedData = Object.assign({}, this.state.data, updatePost);

            this.setState({ isLoading: false, data: combinedData });
        } catch (error) {
            console.log("There was an error: " + error + "... This will turn into a ui element eventually...");
        }
    };

    starPost = () => {
        if (!this.isStarred) {
            this.props.starPost(this.props.userId, this.props.navigation.state.params.data.id);
            this.isStarred = true;
        } else {
            this.props.unstarPost(this.props.userId, this.props.navigation.state.params.data.id);
            this.isStarred = false;
        }
    };

    componentDidMount() {
        this.getPostDetails();
    }

    render() {
        return (
            <>
                <StatusBar barStyle={"light-content"} />
                <PostDetailComponent
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
                />
            </>
        );
    }
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
        starPost: (facebookUserId, postID) =>
            mutate({
                variables: {
                    facebookUserId,
                    postID
                }
            })
    })
});

const unstarPostMutation = graphql(UNSTAR_POST_MUTATION, {
    props: ({ mutate }) => ({
        unstarPost: (facebookUserId, postID) =>
            mutate({
                variables: {
                    facebookUserId,
                    postID
                }
            })
    })
});

const mapStateToProps = (state) => ({
    profile: state.profile,
    userId: state.login.fbUserId
});

export default compose(connect<{}, {}, Props>(mapStateToProps), updatePostMutation, starPostMutation, unstarPostMutation)(
    PostDetail
);
