import { call, put, takeEvery } from 'redux-saga/effects';

import Auth0 from 'react-native-auth0';
import client from '../../Client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations';
import { UserLoginQuery } from '../../graphql/Types';
import { USER_LOGIN_QUERY } from '../../graphql/queries';
import { loginWithAuth0, readOnlyLogin, completeHouseLogin } from '../Routines';

let token: { accessToken?: string; expiryDate?: string } = {};

const auth0 = new Auth0({
    domain: 'flatmates-auth.eu.auth0.com',
    clientId: '16eejgqqPJR1L1jzVRfLxEakufJ47sW6'
});

export const loginSaga = function*() {
    yield takeEvery(loginWithAuth0.TRIGGER, login);
    yield takeEvery(readOnlyLogin.TRIGGER, readOnly);
    yield takeEvery(completeHouseLogin, house);
};

function doesUserExist(userId) {
    return new Promise((resolve) => {
        client
            .query<UserLoginQuery>({
                variables: { userId },
                query: USER_LOGIN_QUERY
            })
            .then(({ data }) => (data.user === null ? resolve(false) : resolve(data.user)));
    });
}

async function updateDatabase(idToken) {
    const { data } = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
            name: 'Joe Fazzino',
            firstName: 'Joe',
            lastName: 'Fazzino',
            imageUrl: 'https://whatever.com',
            gender: 'male',
            birthday: '21/10/1996',
            isSmoker: true,
            idToken,
            bio: 'Founder of Flatmates',
            course: 'Computer Science',
            studyYear: 'First'
        }
    });
    return data.createUser;
}

const login = function*() {
    // Trigger request action
    yield put(loginWithAuth0.request());
    // Wait for response from API and assign it to response
    try {
        const creds = yield auth0.webAuth.authorize({
            scope: 'openid profile email offline_access',
            audience: 'https://flatmates-auth.eu.auth0.com/userinfo'
        });

        // updateDatabase(creds.idToken);

        yield put(loginWithAuth0.success({ creds }));
    } catch ({ error_description }) {
        yield put(loginWithAuth0.failure(error_description));
    }
};

const house = function*({ payload }) {
    yield put(completeHouseLogin.success(payload));
};

const readOnly = function*() {
    yield put(readOnlyLogin.success());
};

// function* getData() {
//     yield put(getUserDataAuth0.request());

//     try {
//         token = yield GET_TOKEN();

//         const response = {};

//         if (response.isError) {
//             yield put(getUserDataAuth0.failure({ response: response.error }));
//         } else {
//             yield call(updateDatabase, response);
//             yield put(getUserDataAuth0.success({ response: response.result }));
//         }
//     } catch (error) {
//         yield put(getUserDataAuth0.failure({ error }));
//     } finally {
//         yield put(getUserDataAuth0.fulfill());
//     }
// }

// function* getLocalData(serverData) {
//     yield put(getUserDataAuth0.request());

//     try {
//         token = yield GET_TOKEN();

//         const response = {};

//         if (response.isError) {
//             yield put(getUserDataAuth0.failure({ response: response.error }));
//         } else {
//             yield put(
//                 getUserDataAuth0.success({
//                     response: Object.assign({}, response.result, serverData)
//                 })
//             );
//         }
//     } catch (error) {
//         yield put(getUserDataAuth0.failure({ error }));
//     } finally {
//         yield put(getUserDataAuth0.fulfill());
//     }
// }
