import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons'

// import { CreateGroupComponent } from '../../components/Chat/CreateGroupComponent';
import { USER_QUERY } from '../../graphql/queries';
import { CREATE_GROUP_MUTATION } from '../../graphql/mutations';
import { chat, base } from '../../styles';
import { ChatDetail } from './ChatDetail';

export class ChatList extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'Create Group'
    }

    constructor(props) {
        super(props);

        this.state = {
            groupName: '',
            creatorId: 1,
            friendIds: [],
        }
    }

    renderSeperator = () => {
        return (
            <View style={base.listSeperator} />
        )
    }

    renderItem = ({ item: { username }}) => {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={base.listPrimaryText}>{username}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={base.inputLabel}>Road Name</Text>
                <TextInput placeholder={'Enter the road name of your house'} />

                <Text style={base.inputLabel}>Who would you like to add to your house?</Text>
                <FlatList
                    data={this.props.friends}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}/>
                <Icon.Button name={'ios-home'}>
                    <Text style={base.confirmButtonText}>Invite Housemates</Text>
                </Icon.Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const bindActions = (dispatch) => {
    return {
        
    };
};

export default connect(mapStateToProps, bindActions)(ChatList)