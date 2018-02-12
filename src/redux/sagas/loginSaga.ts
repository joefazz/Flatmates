import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { call, put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { facebookPermissions } from '../../containers/Login';
import { CREATE_USER_MUTATION } from '../../graphql/mutations';
import { USER_LOGIN_QUERY } from '../../graphql/queries';
import { getUserDataFacebook, loginWithFacebook, signupWithFacebook } from '../Routines';

let token: { accessToken?: string, expiryDate?: string } = {};

export const loginSaga = function *() {
    yield takeEvery(signupWithFacebook.TRIGGER, signup);
    yield takeEvery(loginWithFacebook.TRIGGER, login)
};

function facebookRequest(accessToken) {
    return new Promise((resolve) => {

        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken,
                parameters: {
                    fields: {
                        string: 'email,name,about,picture.height(961),birthday,gender,first_name,last_name'
                    }
                }
            },
            function callback(error, result) {
                if (error) {
                    resolve({ isError: true, error });
                } else {
                    resolve({ isError: false, result });
                }
            }
        );
        new GraphRequestManager().addRequest(infoRequest).start()
    })
}

function doesUserExist(facebookUserId) {
    return new Promise((resolve) => {
        client.query({
            variables: {facebookUserId},
            query: USER_LOGIN_QUERY,
            // @ts-ignore
        }).then(({data}) => data.User === null ? resolve(false) : resolve(true));
    });
}

async function updateDatabase(response) {
    const { data } = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
            name: response.result.name,
            firstName: response.result.first_name,
            lastName: response.result.last_name,
            email: response.result.email,
            facebookUserId: response.result.id,
            imageUrl: response.result.picture.data.url,
            gender: response.result.gender,
            birthday: response.result.birthday
        }
    });
    return data.createUser;
}

function* GET_TOKEN() {
    yield AccessToken.getCurrentAccessToken().then((data) => {
        token.accessToken = data.accessToken;
    });
    return yield token.accessToken;
}

const signup = function *() {
    // Trigger request action
    yield put(signupWithFacebook.request());
    // Wait for response from API and assign it to response
    try {
        let response;
        yield LoginManager.logInWithReadPermissions(facebookPermissions).then((data) => {
            response = data;
        });

        if (response.isCancelled) {
            yield put(signupWithFacebook.failure('Login Process Cancelled'));
        } else {
            yield AccessToken.getCurrentAccessToken().then((data) => {
                token.accessToken = data.accessToken;
                token.expiryDate = data.expirationTime;
                response.userID = data.userID;
            });
            yield put(signupWithFacebook.success({response, token}));
            yield* getData();
        }

    } catch (error) {
        yield put(signupWithFacebook.failure(error));

    } finally {
        yield put(signupWithFacebook.fulfill());
    }
}

const login = function *() {
    yield put(loginWithFacebook.request());

    try {
        let response;
        yield LoginManager.logInWithReadPermissions(facebookPermissions).then((data) => {
            response = data;
        });

        if (response.isCancelled) {
            yield put(loginWithFacebook.failure('Login Process Cancelled'));
        } else {
            yield AccessToken.getCurrentAccessToken().then((data) => {
                token.accessToken = data.accessToken;
                token.expiryDate = data.expirationTime;
                response.userID = data.userID;
            });

            const doesExist = yield call(doesUserExist, response.userID);

            if (doesExist) {
                yield* getLocalData();
                yield put(loginWithFacebook.success({response, token}));
            } else {
                throw new Error('User does not exist');
            }
        }
    } catch (error) {
        yield put(loginWithFacebook.failure(error.message));

    } finally {
        yield put(loginWithFacebook.fulfill());
    }
}

function *getData() {
    yield put(getUserDataFacebook.request());

    try {
        token = yield GET_TOKEN();

        const response = yield call(facebookRequest, token);

        if (response.isError) {
            yield put(getUserDataFacebook.failure({ response: response.error }));
        } else {
            yield call(updateDatabase, response);
            yield put(getUserDataFacebook.success({ response: response.result }));
        }
    } catch (error) {
        yield put(getUserDataFacebook.failure({ error }));
    } finally {
        yield put(getUserDataFacebook.fulfill());
    }
}

function *getLocalData() {
    yield put(getUserDataFacebook.request());

    try {
        token = yield GET_TOKEN();

        const response = yield call(facebookRequest, token);

        if (response.isError) {
            yield put(getUserDataFacebook.failure({ response: response.error }));
        } else {
            yield put(getUserDataFacebook.success({ response: response.result }));
        }
    } catch (error) {
        yield put(getUserDataFacebook.failure({ error }));
    } finally {
        yield put(getUserDataFacebook.fulfill());
    }
}