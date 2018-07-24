import { fork } from 'redux-saga/effects';

import { loginSaga } from './loginSaga';

export const rootSaga = function* () {
    yield fork(loginSaga);
};
