import { call, put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations';
import { CreateUserMutation } from '../../graphql/Types';
import { USER_LOGIN_QUERY } from '../../graphql/queries';
import { getUserData, createUser, readOnlyLogin, completeHouseLogin } from '../Routines';

export const loginSaga = function*() {
    yield takeEvery(createUser.TRIGGER, login);
    yield takeEvery(getUserData.TRIGGER, saveData);
    yield takeEvery(readOnlyLogin.TRIGGER, readOnly);
    yield takeEvery(completeHouseLogin, house);
};

async function updateDatabase(user): Promise<CreateUserMutation> {
    const { data: { createUser: userData } } = await client.mutate<CreateUserMutation>({
        mutation: CREATE_USER_MUTATION,
        variables: { ...user }
    });

    return userData;
}

const login = function*({ payload }) {
    // Trigger request action
    yield put(createUser.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield updateDatabase(payload);

        const user = Object.assign({}, result, { profile: payload });

        yield put(createUser.success({ user }));
    } catch (error) {
        yield put(createUser.failure(error));
    } finally {
        createUser.fulfill();
    }
};

const saveData = function*({ payload }) {
    yield put(getUserData.success(payload));
};

const house = function*({ payload }) {
    yield put(completeHouseLogin.success(payload));
};

const readOnly = function*() {
    yield put(readOnlyLogin.success());
};
