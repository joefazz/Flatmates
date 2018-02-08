import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import randomColor from 'randomcolor';

import { ChatDetailComponent } from '../../components/Chat/ChatDetailComponent';

const fakeData = _.times(100, i => ({
    // every message will have a different color
    color: randomColor(),
    // every 5th message will look like it's from the current user
    isCurrentUser: i % 5 === 0,
    message: {
        id: i,
        createdAt: new Date().toISOString(),
        from: {
            username: `Username ${i}`,
        },
        text: `Message ${i}`,
    },
}));

interface Props  {
    createMessage: () => mixed
};

interface State {
    messages: Array<{}>
}

export class ChatDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: state.params.title,
            tabBarVisible: false,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            messages: fakeData
        };
    }

    render() {
        return (
            <ChatDetailComponent data={this.state} createMessage={this.props.createMessage} />
        );
    }
}

const mapStateToProps = () => ({
    
});

const bindActions = () => {
    return {
        
    };
};

export default connect(mapStateToProps, bindActions)(ChatDetail);