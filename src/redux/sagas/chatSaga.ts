import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { getChatMessages, createMessage } from '../Routines';
import {
    ChatMessagesQuery,
    ChatMessagesQueryVariables,
    CreateMessageMutationVariables,
    CreateMessageMutation
} from '../../graphql/Types';
import { GET_CHAT_MESSAGES_QUERY } from '../../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations/Chat/CreateMessage';

export const chatSaga = function*() {
    yield takeEvery(getChatMessages.TRIGGER, get);
    yield takeEvery(createMessage.TRIGGER, create);
};

async function getChatMessagesQuery(
    params: ChatMessagesQueryVariables
): Promise<ChatMessagesQuery> {
    const { data } = await client.query<ChatMessagesQuery>({
        query: GET_CHAT_MESSAGES_QUERY,
        variables: { ...params }
    });

    return data;
}

async function createMessageMutation(
    params: CreateMessageMutationVariables
): Promise<CreateMessageMutation> {
    const {
        data: { createMessage }
    } = await client.mutate({
        mutation: CREATE_MESSAGE_MUTATION,
        variables: { ...params }
    });

    return createMessage;
}

function* get({ payload }) {
    // Trigger request action
    yield put(getChatMessages.request());
    // Wait for response from API and assign it to response
    console.log(payload);
    try {
        const {
            group: { messages }
        } = yield getChatMessagesQuery(payload);

        yield put(getChatMessages.success({ messages }));
    } catch (error) {
        yield put(getChatMessages.failure(error));
    }

    yield put(getChatMessages.fulfill());
}

function* create({ payload }) {
    try {
        const result = yield createMessageMutation(payload);

        if (result) {
            yield put(createMessage.success({ result }));
        } else {
            throw new Error('Problem sending message');
        }
    } catch (error) {
        yield put(createMessage.failure({ error }));
    }
}

// function* remove(id: string) {
//     try {
//         const appID = yield deleteApplicationMutation(id);
//         yield put(deleteApplication.success({ appID }));
//     } catch (error) {
//         yield put(deleteApplication.failure({ error }));
//     }
// }
