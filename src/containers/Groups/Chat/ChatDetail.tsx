import * as React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { ReduxState, ChatState } from '../../../types/ReduxTypes';
import { getChatMessages, createMessage } from '../../../redux/Routines';
import { ChatMessagesQueryVariables } from '../../../graphql/Types';

interface Props {
    createMessage: () => void;
    getMessages: (params: ChatMessagesQueryVariables) => void;
    navigation: {
        state: {
            params: {
                messages: Array<string>;
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

        this.props.getMessages({ id: props.navigation.state.params.groupId });
    }

    render() {
        return (
            <ChatDetailComponent
                id={123}
                data={this.props.chat.messages}
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
    createMessage: (params) => dispatch(createMessage(params))
});

export default connect(mapStateToProps, bindActions)(ChatDetail);
