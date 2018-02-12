import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Platform, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { Colors } from '../../consts';
import { USER_POST_QUERY } from '../../graphql/queries';
import { createPost } from '../../redux/Routines';
import { base, feed } from '../../styles';
import { toConstantFontSize, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';

interface Props  {
    navigation: {pop: () => void, state: {params: {fbUserId: string}}},
    user: object,
    loading: boolean,
    createPost: ({title, description, createdBy}) => void
};

interface State {
    data: { house: {spaces: number, road: string, shortID: number} },
    isLoading: boolean,
    title: string,
    description: string
};

export class CreatePost extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Create Post',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.user,
            isLoading: props.loading,
            title: '',
            description: ''
        };
    }

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
            title: this.state.title,
            description: this.state.description,
            createdBy: this.state.data.house.shortID
        });

        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={[ base.wholePage, {alignItems: 'center', justifyContent: 'center'} ]}>
                <View style={ base.headingWrapper }>
                    <Text style={[ base.headingText, {fontSize: toConstantFontSize(2.5)} ]}>Enter the title of the post and a description of the room{this.state.data.house.spaces > 0 ? 's' : ''} and we'll take care of the rest using the information you entered when you signed up</Text>
                </View>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'space-around'}}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={ base.labelText }>Title</Text>
                        <TextInput onChangeText={(text) => this.setState({ title: text })} style={[ base.fullWidthInput, {width: toConstantWidth(85)} ]} placeholder={'Enter post title'} />
                    </View>

                    <View>
                        <Text style={ base.labelText }>Description</Text>
                        <TextInput onChangeText={(text) => this.setState({ description: text })} underlineColorAndroid={Colors.transparent} style={ feed.descriptionInput } multiline={true} defaultValue={(this.state.data.house.spaces > 0 ? 'Looking to fill ' + this.state.data.house.spaces + ' rooms ' : 'a room ') + 'on ' + this.state.data.house.road + ' '} />
                    </View>

                    <TouchableRect title={'Create'} buttonStyle={ base.buttonStyle } backgroundColor={Colors.brandSecondaryColor} onPress={this.createPostTrigger} />
                </View>
            </View>
        );
    }
}

const getUserInfo = graphql(USER_POST_QUERY, {
    options(props: Props) {
        return {
            variables: {facebookUserId: props.navigation.state.params.fbUserId}
        };
    },
    // @ts-ignore
    props({ data: {user, loading} }) {
        return {
            user,
            loading
        };
    }
});

const mapStateToProps = () => ({
});

const bindActions = (dispatch) => {
    return {
        createPost: ({title, description, createdBy}) => dispatch(createPost({title, description, createdBy}))
    };
};

export default compose(
    connect(mapStateToProps, bindActions),
    getUserInfo
)(CreatePost);
