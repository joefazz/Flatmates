import * as React from 'react';
import { compose, graphql } from 'react-apollo';
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
import { User } from '../../types/Entities';
import { toConstantFontSize, toConstantHeight } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';

interface Props {
    navigation: { pop: () => void };
    user: User;
    login: LoginState;
    loading: boolean;
    createPost: ({ description, createdBy }) => void;
}

interface State {
    data: { house: { spaces: number; road: string; shortID: number } };
    isLoading: boolean;
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
            data: this.props.data.user,
            isLoading: true,
            description: ''
        };
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (newProps.loading !== this.state.isLoading) {
            this.setState({
                data: newProps.data.user,
                isLoading: newProps.data.loading
            });
        }
    }

    createPostTrigger = () => {
        this.props.createPost({
            description: this.state.description,
            createdBy: this.state.data.house.shortID
        });

        this.props.navigation.pop();
    };

    render() {
        if (this.state.isLoading) {
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
                                (this.state.data.house.spaces > 0
                                    ? 'Looking to fill ' + this.state.data.house.spaces + ' rooms '
                                    : 'a room ') +
                                'on ' +
                                this.state.data.house.road +
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

const getUserInfo = graphql<Response, Props>(USER_POST_QUERY, {
    options(props) {
        return {
            variables: { id: props.login.id }
        };
    },
    // @ts-ignore
    props({ data }) {
        return {
            data
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
