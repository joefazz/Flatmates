import randomColor from 'randomcolor';
import * as React from 'react';
import { connect } from 'react-redux';

import { ChatDetailComponent } from '../../../components/Chat/ChatDetailComponent';
import { Message } from '../../../components/Chat/MessageComponent';

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
}

interface State {
    messages: Array<Message>;
}

export class ChatDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: state.params.title,
            tabBarVisible: false
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    render() {
        return (
            <ChatDetailComponent
                id={123}
                data={this.state.messages}
                createMessage={this.props.createMessage}
            />
        );
    }
}

const mapStateToProps = () => ({});

const bindActions = () => {
    return {};
};

export default connect(mapStateToProps, bindActions)(ChatDetail);
