import { Facebook } from 'expo';
import { takeEvery, put } from 'redux-saga/effects';

import { facebookPermissions } from '../../containers/Login';
import { loginWithFacebook } from '../routines';
import { Strings } from '../../consts';

export const loginSaga = function *() {
    yield takeEvery(loginWithFacebook.TRIGGER, login);
};

const login = function *() {
    try {
        // Trigger request action
        yield put(loginWithFacebook.request());
        // Wait for response from API and assign it to response
        const response = yield Facebook.
            logInWithReadPermissionsAsync(Strings.FACEBOOK_APP_ID, { permissions: facebookPermissions });

        console.log(response);
        if (response.type === 'cancel') {
            yield put(loginWithFacebook.failure('Login Cancelled'));
        } else {
            yield put(loginWithFacebook.success(response));
        }
    } catch (error) {
        // If request fails
        yield put(loginWithFacebook.failure(error.messages));
    } finally {
        // At end of request
        yield put(loginWithFacebook.fulfill());
    }
}