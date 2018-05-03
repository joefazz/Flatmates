import * as React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { ReduxState, ChatState } from '../../../types/ReduxTypes';
import { getChatMessages, createMessage } from '../../../redux/Routines';
import { ChatMessagesQueryVariables, CreateMessageMutationVariables } from '../../../graphql/Types';
import { Group } from '../../../types/Entities';

interface Props {
    createMessage: (params: CreateMessageMutationVariables) => void;
    getMessages: (params: ChatMessagesQueryVariables) => void;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
                groupData: Group;
                userID: string;
            };
        };
    };
    chat: ChatState;
}

export class ChatDetail extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        tabBarVisible: false
    });

    constructor(props) {
        super(props);

        console.log(props);
        this.props.getMessages({ id: props.navigation.state.params.groupData.id });
    }

    render() {
        return (
            <ChatDetailComponent
                data={{
                    groupInfo: this.props.navigation.state.params.groupData,
                    messages: this.props.chat.messages
                }}
                userID={this.props.navigation.state.params.userID}
                createMessage={this.props.createMessage}
            />
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    chat: state.chat
});

const bindActions = (dispatch) => ({
    getMessages: (params: ChatMessagesQueryVariables) => dispatch(getChatMessages(params)),
    createMessage: (params: CreateMessageMutationVariables) => dispatch(createMessage(params))
});

export default connect(mapStateToProps, bindActions)(ChatDetail);
