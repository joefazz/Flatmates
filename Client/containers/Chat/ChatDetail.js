import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import randomColor from 'randomcolor';

import { ChatDetailComponent } from '../../components/Chat/DetailComponent';

const fakeData = () => _.times(100, i => ({
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

export class ChatDetail extends React.Component {
    static navigationOptions = {
        title: 'Chat Detail',
    }

    render() {
        return (
            <ChatDetailComponent data={fakeData} />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, bindActions)(ChatDetail)