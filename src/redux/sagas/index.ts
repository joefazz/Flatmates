import { fork } from 'redux-saga/effects';

import { postSaga } from './feedSaga';
import { loginSaga } from './loginSaga';
import { applicationSaga } from './applicationSaga';

export const rootSaga = function *() {
    yield fork(loginSaga);
    yield fork(postSaga);
    yield fork(applicationSaga);
};
