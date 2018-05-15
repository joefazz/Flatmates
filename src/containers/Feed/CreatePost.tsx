import React from 'react';
import { compose, graphql, ChildProps } from 'react-apollo';
import {
    ActivityIndicator,
    Platform,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { Colors } from '../../consts';
import { USER_POST_QUERY } from '../../graphql/queries';
import { createPost } from '../../redux/Routines';
import { base, feed } from '../../styles';
import { LoginState } from '../../types/ReduxTypes';
import { House } from '../../types/Entities';
import { toConstantHeight } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';
import { UserPostQuery, UserPostQueryVariables } from '../../graphql/Types';

interface Props {
    navigation: { pop: () => void };
    login: LoginState;
    createPost: ({ description, createdBy }) => void;
    loading: boolean;
    user: { house: House };
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

    createPostTrigger = () => {
        if (this.state.description === '') {
            this.props.createPost({
                description:
                    this.props.user.house.spaces > 1
                        ? `Looking to fill ${this.props.user.house.spaces} rooms on ${
                              this.props.user.house.road
                          }.`
                        : `Looking to fill a room on ${this.props.user.house.road}.`,
                createdBy: this.props.user.house.shortID
            });
        } else {
            this.props.createPost({
                description: this.state.description,
                createdBy: this.props.user.house.shortID
            });
        }

        this.props.navigation.pop();
    };

    render() {
        if (this.props.loading) {
            return <ActivityIndicator />;
        }

        return (
            <View style={[base.wholePage, { alignItems: 'center', justifyContent: 'center' }]}>
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
                        onPress={this.createPostTrigger}
                    />
                </View>
            </View>
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

const bindActions = (dispatch) => {
    return {
        createPost: ({ description, createdBy }) => dispatch(createPost({ description, createdBy }))
    };
};

export default compose(connect<{}, {}, Props>(mapStateToProps, bindActions), getUserInfo)(
    CreatePost
);
