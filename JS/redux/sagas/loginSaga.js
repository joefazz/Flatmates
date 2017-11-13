import { Facebook } from 'expo';
import { takeEvery, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { facebookPermissions } from '../../containers/Login';
import { loginWithFacebook } from '../Routines';
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

        if (response.type === 'cancel') {
            yield put(loginWithFacebook.failure('Login Process Cancelled'));
        } else {
            yield put(loginWithFacebook.success(response));
            yield put(NavigationActions.navigate({routeName: 'Home'}));
        }
    } catch (error) {
        // If request fails
        yield put(loginWithFacebook.failure());
    } finally {
        // At end of request
        yield put(loginWithFacebook.fulfill());
    }
}