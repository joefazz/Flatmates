import { loginWithFacebook } from '../routines';
import { Strings, Config } from '../../consts';
import { takeEvery, put } from 'redux-saga/effects';

export const loginWatcher = function *() {
    yield takeEvery(loginWithFacebook.TRIGGER, login);
};

const login = function *() {
    try {
        // Trigger request action
        yield put(loginWithFacebook.request());

        // Wait for response from API and assign it to response
        const response = yield Facebook.
            logInWithReadPermissionsAsync(Strings.FACEBOOK_APP_ID, { permissions: Config.FACEBOOK_PERMISSIONS });

        yield put(loginWithFacebook.success(response));
    } catch (error) {
        // If request fails
        yield put(loginWithFacebook.failure(error.messages));
    } finally {
        // At end of request
        yield put(loginWithFacebook.fulfill());
    }
}