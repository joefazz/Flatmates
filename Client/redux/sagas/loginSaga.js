import { takeEvery, put, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { graphql, gql } from 'react-apollo';

import client from '../../Client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations';
import { facebookPermissions } from '../../containers/Login';
import { loginWithFacebook, getUserDataFacebook } from '../Routines';
import { Strings } from '../../consts';

export const loginSaga = function *() {
    yield takeEvery(loginWithFacebook.TRIGGER, login);
};

function facebookRequest(token) {
    return new Promise(resolve => {
        
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: token,
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

function updateDatabase(response) {
    return new Promise(resolve => {
        client.mutate({ 
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
            },
            update: function(proxy, { data: { createUser }}) {
                resolve({ query: createUser });
            }
        });
    })
}

function* GET_TOKEN() {
    let token = {};
    yield AccessToken.getCurrentAccessToken().then(function(data) {
        token.accessToken = data.accessToken;
    });
    return yield token.accessToken;
}

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
            yield* getData();    
        }
    } catch (error) {
        yield put(loginWithFacebook.failure(error));
        
    } finally {
        yield put(loginWithFacebook.fulfill());
    }
}

function *getData() {
    yield put(getUserDataFacebook.request());

    try {
        const token = yield GET_TOKEN();
        
        const response = yield call(facebookRequest, token);     
            
        if (response.isError) {
            yield put(getUserDataFacebook.failure({ response: response.error }));
        } else {
            yield put(getUserDataFacebook.success({ response: response.result }));
            const payload = yield call(updateDatabase, response);
            yield put({ type: 'UPDATE_USER_DATA', payload })
        }
    } catch (error) {
        yield put(getUserDataFacebook.failure({ error }));
    } finally {
        yield put(getUserDataFacebook.fulfill());
    }
}