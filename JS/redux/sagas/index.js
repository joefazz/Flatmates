import { all, takeEvery } from 'redux-saga/effects';

import { loginWatcher } from './loginSaga';

export const rootSaga = function *() {
    yield takeEvery('persist/REHYDRATE', loadSagas);
};

const loadSagas = function*() {
    yield all([
        loginWatcher() 
    ]);
};
