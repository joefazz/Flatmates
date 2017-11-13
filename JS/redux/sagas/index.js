import { takeEvery, fork } from 'redux-saga/effects';
import { loginWithFacebook } from '../Routines';
import { loginSaga } from './loginSaga';
import { store } from '../store';

export const rootSaga = function *() {
    yield fork(loginSaga);
};

