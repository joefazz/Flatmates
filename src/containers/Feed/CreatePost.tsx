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
import { USER_POST_QUERY, POST_LIST_QUERY, USER_HOUSE_POST_QUERY, HOUSE_POST_QUERY } from '../../graphql/queries';
import { base, feed } from '../../styles';
import { LoginState } from '../../types/ReduxTypes';
import { House } from '../../types/Entities';
import { toConstantHeight, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';
import { UserPostQuery, UserPostQueryVariables, CreatePostMutationVariables, AllPostsQuery, CreatePostMutation, HousePostQuery } from '../../graphql/Types';
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
                update={(store, { data }) => {
                    const postData: AllPostsQuery = store.readQuery({
                        query: POST_LIST_QUERY,
                        variables: {
                            take: 10,
                            skip: 0
                        }
                    });

                    postData.allPosts.unshift(data.createPost);

                    store.writeQuery({
                        query: POST_LIST_QUERY,
                        variables: {
                            take: 10,
                            skip: 0
                        },
                        data: postData
                    });

                    const houseData: HousePostQuery = store.readQuery({
                        query: HOUSE_POST_QUERY,
                        variables: { shortID: this.props.user.house.shortID }
                    });

                    houseData.house.post = { __typename: data.createPost.__typename, viewCount: data.createPost.viewCount, id: data.createPost.id, description: data.createPost.description, lastSeen: data.createPost.lastSeen };
                    console.log(houseData);

                    store.writeQuery({
                        query: HOUSE_POST_QUERY,
                        variables: { shortID: this.props.user.house.shortID },
                        data: houseData
                    });
                }}
                optimisticResponse={
                    {
                        __typename: 'Mutation',
                        createPost: {
                            __typename: 'Post',
                            id: "-1",
                            description: this.state.description,
                            createdAt: Date.now(),
                            lastSeen: Date.now(),
                            viewCount: 0,
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
                        <View style={{ marginTop: toConstantHeight(4) }}>
                            <Text style={base.labelText}>Description</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ description: text })}
                                underlineColorAndroid={Colors.transparent}
                                enablesReturnKeyAutomatically={true}
                                style={feed.descriptionInput}
                                multiline={true}
                                returnKeyType={'done'}
                                placeholderTextColor={Colors.grey}
                                placeholder={`Enter information here that you haven't already provided during sign up. Some ideas of what to talk about: total number of bedrooms, number of bathrooms, parking availability, public transport links, etcetra.`}
                            />
                        </View>

                        <TouchableRect
                            title={'Create'}
                            buttonStyle={{ width: toConstantWidth(85) }}
                            wrapperStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
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
