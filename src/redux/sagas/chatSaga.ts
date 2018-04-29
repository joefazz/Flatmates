import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { getChatMessages } from '../Routines';
import { ChatMessagesQuery, ChatMessagesQueryVariables } from '../../graphql/Types';
import { GET_CHAT_MESSAGES_QUERY } from '../../graphql/queries';

export const chatSaga = function*() {
    yield takeEvery(getChatMessages.TRIGGER, get);
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

// function* create({ payload }) {
//     try {
//         const result = yield createApplicationMutation(payload);
//         yield put(createApplication.success({ result }));
//     } catch (error) {
//         yield put(createApplication.failure({ error }));
//     }
// }

// function* remove(id: string) {
//     try {
//         const appID = yield deleteApplicationMutation(id);
//         yield put(deleteApplication.success({ appID }));
//     } catch (error) {
//         yield put(deleteApplication.failure({ error }));
//     }
// }
