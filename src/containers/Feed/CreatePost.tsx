import React from 'react';
import { compose, graphql, ChildProps, Mutation } from 'react-apollo';
import {
    ActivityIndicator,
    Platform,
    Text,
    TextInput,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { Colors } from '../../consts';
import { USER_POST_QUERY, POST_LIST_QUERY } from '../../graphql/queries';
import { base, feed } from '../../styles';
import { LoginState } from '../../types/ReduxTypes';
import { House } from '../../types/Entities';
import { toConstantHeight } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';
import { UserPostQuery, UserPostQueryVariables, CreatePostMutationVariables, AllPostsQuery, CreatePostMutation } from '../../graphql/Types';
import { CREATE_POST_MUTATION } from '../../graphql/mutations';

interface Props {
    navigation: { pop: () => void };
    login: LoginState;
    loading: boolean;
    user: { house: House };
    createPost: (params: CreatePostMutationVariables) => void;
}

interface State {
    description: string;
}

export class CreatePost extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Create Post',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={
                    Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home'
                }
                color={tintColor}
                size={32}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            description: ''
        };
    }

    createPostTrigger = (createPost) => {
        if (this.state.description === '') {
            createPost({
                variables: {
                    description:
                        this.props.user.house.spaces > 1
                            ? `Looking to fill ${this.props.user.house.spaces} rooms on ${
                            this.props.user.house.road
                            }.`
                            : `Looking to fill a room on ${this.props.user.house.road}.`,
                    createdBy: this.props.user.house.shortID
                }
            });
        } else {
            createPost({
                variables: {
                    description: this.state.description,
                    createdBy: this.props.user.house.shortID
                }
            });
        }

        this.props.navigation.pop();
    };

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <Mutation
                mutation={CREATE_POST_MUTATION}
                update={(store, { data }: { data: CreatePostMutation }) => {
                    const postData: AllPostsQuery = store.readQuery({
                        query: POST_LIST_QUERY,
                        variables: {
                            take: 10,
                            skip: 0
                        }
                    });

                    postData.allPosts.push(data.createPost);

                    store.writeQuery({
                        query: POST_LIST_QUERY,
                        variables: {
                            take: 10,
                            skip: 0
                        },
                        data: postData
                    });
                }}
                optimisticResponse={
                    {
                        __typename: 'Mutation',
                        createPost: {
                            __typename: 'Post',
                            id: -1,
                            description: this.state.description,
                            createdAt: Date.now(),
                            lastSeen: Date.now(),
                            createdBy: {
                                ...this.props.user.house
                            }
                        }
                    }}
            >
                {(createPost) => (<View style={[base.wholePage, { alignItems: 'center', justifyContent: 'center' }]}>
                    <View
                        style={{
                            flex: 4,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <View style={{ marginVertical: toConstantHeight(4) }}>
                            <Text style={base.labelText}>Description</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ description: text })}
                                underlineColorAndroid={Colors.transparent}
                                enablesReturnKeyAutomatically={true}
                                style={feed.descriptionInput}
                                multiline={true}
                                returnKeyType={'done'}
                                defaultValue={
                                    (this.props.user.house.spaces > 0
                                        ? 'Looking to fill ' + this.props.user.house.spaces + ' rooms '
                                        : 'a room ') +
                                    'on ' +
                                    this.props.user.house.road +
                                    '. '
                                }
                            />
                        </View>

                        <TouchableRect
                            title={'Create'}
                            buttonStyle={base.buttonStyle}
                            backgroundColor={Colors.brandPrimaryColor}
                            onPress={() => this.createPostTrigger(createPost)}
                        />
                    </View>
                </View>)
                }
            </Mutation>
        );
    }
}

interface InputProps {
    login: { id: string };
}

const getUserInfo = graphql<
    InputProps,
    UserPostQuery,
    UserPostQueryVariables,
    ChildProps<UserPostQuery>
    >(USER_POST_QUERY, {
        options(props) {
            return {
                variables: { id: props.login.id },
                fetchPolicy: 'network-only'
            };
        },
        // @ts-ignore
        props({ data: { loading, user } }) {
            return {
                loading,
                user
            };
        }
    });

const mapStateToProps = (state) => ({
    login: state.login
});

export default compose(connect<{}, {}, Props>(mapStateToProps, {}), getUserInfo)(
    CreatePost
);
