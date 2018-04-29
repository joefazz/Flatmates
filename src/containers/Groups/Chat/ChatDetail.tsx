import * as React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { Message } from '../../../components/Chat/MessageComponent';
import { ReduxState } from '../../../types/ReduxTypes';
import { getChatMessages } from '../../../redux/Routines';
import { ActivityIndicator } from 'react-native';
import { ChatMessagesQueryVariables } from '../../../graphql/Types';

// const fakeData = _.times(100, (i) => ({
//     // every message will have a different color
//     color: randomColor(),
//     // every 5th message will look like it's from the current user
//     isCurrentUser: i % 5 === 0,
//     message: {
//         id: i,
//         createdAt: new Date().toISOString(),
//         from: {
//             username: `Username ${i}`,
//         },
//         text: `Message ${i}`,
//     },
// }));

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
}

interface State {
    messages: Array<Message>;
}

export class ChatDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        tabBarVisible: false
    });

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.props.getMessages({ id: props.navigation.state.params.groupId });
    }

    render() {
        return <ActivityIndicator />;
        // return <ChatDetailComponent id={123} createMessage={this.props.createMessage} />;
    }
}

const mapStateToProps = (state: ReduxState) => ({
    chat: state.chat
});

const bindActions = (dispatch) => ({
    getMessages: (params: ChatMessagesQueryVariables) => dispatch(getChatMessages(params))
});

export default connect(mapStateToProps, bindActions)(ChatDetail);
