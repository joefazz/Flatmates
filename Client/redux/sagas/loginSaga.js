import { takeEvery, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { graphql, gql } from 'react-apollo';

import { facebookPermissions } from '../../containers/Login';
import { loginWithFacebook } from '../Routines';
import { Strings } from '../../consts';

export const loginSaga = function *() {
    yield takeEvery(loginWithFacebook.TRIGGER, login);
};

const login = function *() {
    // Trigger request action
    yield put(loginWithFacebook.request());
    // Wait for response from API and assign it to response    
    try {
        let response;
        let token = {};
        yield LoginManager.logInWithReadPermissions(facebookPermissions).then(data => {
            response = data;
        });
        yield AccessToken.getCurrentAccessToken().then(data => {
            token.accessToken = data.accessToken;
            token.expiryDate = data.expirationTime;
            response.userID = data.userID;
        });

        if (response.isCancelled) {
            yield put(loginWithFacebook.failure('Login Process Cancelled'));
        } else {
            yield put(loginWithFacebook.success({response, token}));
        }
    } catch (error) {
        yield put(loginWithFacebook.failure(error));
        
    }
    yield put(loginWithFacebook.fulfill());
}