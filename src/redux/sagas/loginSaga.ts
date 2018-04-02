import { call, put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { CREATE_USER_MUTATION, CREATE_USER_CREATE_HOUSE_MUTATION } from '../../graphql/mutations';
import { CreateUserMutation, CreateUserCreateHouseMutation } from '../../graphql/Types';
import { USER_LOGIN_QUERY } from '../../graphql/queries';
import { getUserData, createUser, readOnlyLogin, createUserWithHouse } from '../Routines';

export const loginSaga = function*() {
    yield takeEvery(createUser.TRIGGER, login);
    yield takeEvery(getUserData.TRIGGER, saveData);
    yield takeEvery(readOnlyLogin.TRIGGER, readOnly);
    yield takeEvery(createUserWithHouse.TRIGGER, houseLogin);
};

async function createUserMutation(user): Promise<CreateUserMutation> {
    const { data: { createUser: userData } } = await client.mutate<CreateUserMutation>({
        mutation: CREATE_USER_MUTATION,
        variables: { ...user }
    });

    return userData;
}

async function createUserCreateHouseMutation(user): Promise<CreateUserCreateHouseMutation> {
    const { data: { createUser: userData } } = await client.mutate<CreateUserCreateHouseMutation>({
        mutation: CREATE_USER_CREATE_HOUSE_MUTATION,
        variables: { ...user }
    });

    return userData;
}

const login = function*({ payload }) {
    // Trigger request action
    yield put(createUser.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserMutation(payload);

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

const houseLogin = function*({ payload }) {
    // Trigger request action
    console.log(payload);
    yield put(createUserWithHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserCreateHouseMutation(payload);

        console.log(result);

        const user = Object.assign({}, result, { profile: payload });

        yield put(createUserWithHouse.success({ user }));
    } catch (error) {
        yield put(createUserWithHouse.failure(error));
    } finally {
        createUserWithHouse.fulfill();
    }
};

const readOnly = function*() {
    yield put(readOnlyLogin.success());
};
