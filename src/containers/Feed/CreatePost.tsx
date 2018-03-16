import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ActivityIndicator, Platform, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { Colors } from "../../consts";
import { USER_POST_QUERY } from "../../graphql/queries";
import { createPost } from "../../redux/Routines";
import { base, feed } from "../../styles";
import { LoginState } from "../../types/ReduxTypes";
import { User } from "../../types/Entities";
import { toConstantFontSize } from "../../utils/PercentageConversion";
import { TouchableRect } from "../../widgets/TouchableRect";

interface Props {
    navigation: { pop: () => void; state: { params: { fbUserId: string } } };
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
        title: "Create Post",
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={Platform.OS === "ios" ? (focused ? "ios-home" : "ios-home-outline") : "md-home"}
                color={tintColor}
                size={32}
            />
        )
    };

    readonly state: State = {
        data: this.props.user,
        isLoading: this.props.loading,
        description: ""
    };

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({
                data: newProps.user,
                isLoading: newProps.loading
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
            <View style={[base.wholePage, { alignItems: "center", justifyContent: "center" }]}>
                <View style={base.headingWrapper}>
                    <Text style={[base.headingText, { fontSize: toConstantFontSize(2.3) }]}>
                        Enter the title of the post and a description of the room{this.state.data.house.spaces > 0 ? "s" : ""} and
                        we'll take care of the rest using the information you entered when you signed up
                    </Text>
                </View>
                <View
                    style={{
                        flex: 4,
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                >
                    <View>
                        <Text style={base.labelText}>Description</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ description: text })}
                            underlineColorAndroid={Colors.transparent}
                            style={feed.descriptionInput}
                            multiline={true}
                            defaultValue={
                                (this.state.data.house.spaces > 0
                                    ? "Looking to fill " + this.state.data.house.spaces + " rooms "
                                    : "a room ") +
                                "on " +
                                this.state.data.house.road +
                                ". "
                            }
                        />
                    </View>

                    <TouchableRect
                        title={"Create"}
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
    options(props: Props) {
        return {
            variables: { facebookUserId: props.login.fbUserId }
        };
    },
    // @ts-ignore
    props({ data: { user, loading } }) {
        return {
            user,
            loading
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

export default compose(connect<{}, {}, Props>(mapStateToProps, bindActions), getUserInfo)(CreatePost);
