import * as React from 'react';
import { View, TextInput, Text } from 'react-native';
import { graphql } from 'react-apollo';

import { base, feed } from '../../styles';
import { USER_DETAILS_QUERY } from '../../graphql/queries';
import { toConstantFontSize, toConstantWidth } from '../../utils/PercentageConversion';
import { TouchableRect } from '../../widgets/TouchableRect';
import { Colors } from '../../consts/index';
import Client from '../../Client';
import { CREATE_POST_MUTATION } from '../../graphql/mutations';

interface Props  {
    navigation: {state: {params: {fbUserId: string}}},
    user: {},
    loading: boolean
};

interface State {
    data: { house: {spaces: number, road: string, shortID: number} },
    isLoading: boolean,
    title: string,
    description: string
};

export class CreatePost extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Create Post'
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

    createPostMutation = async () => {
        await Client.mutate({
            mutation: CREATE_POST_MUTATION,
            variables: {
                createdBy: this.state.data.house.shortID,
                title: this.state.title,
                description: this.state.description
            }
        });
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


                    <TouchableRect title={'Create'} buttonStyle={ base.buttonStyle } backgroundColor={Colors.brandSecondaryColor} onPress={this.createPostMutation} />
                </View>
            </View>
        );
    }
}

export default graphql(USER_DETAILS_QUERY, {
    options(props) {
        return {
            variables: {facebookUserId: props.navigation.state.params.fbUserId}
        };
    },
    props({ data: {user, loading} }) {
        return {
            user,
            loading
        };
    }
}
)(CreatePost);
