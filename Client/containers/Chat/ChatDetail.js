import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import randomColor from 'randomcolor';

import { ChatDetailComponent } from '../../components/Chat/DetailComponent';
import { GROUP_QUERY } from '../../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';

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

export class ChatDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: state.params.title,
            tabBarVisible: false,
        };
    };
    render() {
        return (
            <ChatDetailComponent data={this.props.data} createMessage={this.props.createMessage} />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

const groupQuery = graphql(GROUP_QUERY, {
    options: ownProps => ({
        variables: {
            groupId: ownProps.navigation.state.params.groupId,
        },
    }),
    props: ({ data }) => ({
        data
    })
});

function isDuplicateMessage(newMessage, existingMessages) {
    return newMessage.id !== null &&
      existingMessages.some(message => newMessage.id === message.id);
}

const createMessageMutation = graphql(CREATE_MESSAGE_MUTATION, {
    props: ({ mutate }) => ({
        createMessage: ({ text, userId, groupId }) => 
            mutate({
                variables: {text, userId, groupId},
                optimisticResponse: {
                    __typename: 'Mutation',
                    createMessage: {
                        __typename: 'Message',
                        id: -1, // id doesn't matter
                        text, // don't know this either
                        createdAt: new Date().toISOString(), // time is now
                        from: {
                            __typename: 'User',
                            id: 1,
                            username: 'Justyn.Kautzer'
                        },
                        to: {
                            __typename: 'Group',
                            id: 1,
                        },
                    },
                },
                update: (store, { data: { createMessage } }) => {
                    // Read data from cache for this query
                    const data = store.readQuery({
                        query: GROUP_QUERY,
                        variables: {
                            groupId,
                        },
                    });

                    if (isDuplicateMessage(createMessage, data.group.messages)) {
                        return data;
                    } else {
                        data.group.messages.unshift(createMessage);

                        // Write data back to cache
                        store.writeQuery({
                            query: GROUP_QUERY,
                            variables: {
                                groupId
                            },
                            data,
                        })
                    }
                }
            }),
    })
})

export default compose(
    groupQuery,
    createMessageMutation,
    connect(mapStateToProps, bindActions)
)(ChatDetail);