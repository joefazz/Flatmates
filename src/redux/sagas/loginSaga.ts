import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import {
    CREATE_USER_MUTATION,
    CREATE_USER_CREATE_HOUSE_MUTATION,
    CREATE_USER_UPDATE_HOUSE_MUTATION
} from '../../graphql/mutations';
import {
    CreateUserMutation,
    CreateUserCreateHouseMutation,
    CreateUserUpdateHouseMutation,
    CreateUserCreateHouseMutationVariables,
    CreateUserMutationVariables,
    CreateUserUpdateHouseMutationVariables
} from '../../graphql/Types';
import {
    getUserData,
    createUser,
    readOnlyLogin,
    createUserWithHouse,
    createUserJoinHouse
} from '../Routines';

export const loginSaga = function*() {
    yield takeEvery(createUser.TRIGGER, login);
    yield takeEvery(getUserData.TRIGGER, saveData);
    yield takeEvery(readOnlyLogin.TRIGGER, readOnly);
    yield takeEvery(createUserWithHouse.TRIGGER, houseLogin);
    yield takeEvery(createUserJoinHouse.TRIGGER, joinHouse);
};

async function createUserMutation(
    params: CreateUserMutationVariables
): Promise<CreateUserMutation> {
    const { data: { createUser: userData } } = await client.mutate<CreateUserMutation>({
        mutation: CREATE_USER_MUTATION,
        variables: { ...params }
    });

    return userData;
}

async function createUserCreateHouseMutation(
    params: CreateUserCreateHouseMutationVariables
): Promise<CreateUserCreateHouseMutation> {
    const { data: { createUserCreateHouse: userData } } = await client.mutate<
        CreateUserCreateHouseMutation
    >({
        mutation: CREATE_USER_CREATE_HOUSE_MUTATION,
        variables: { ...params }
    });

    return userData;
}

async function createUserUpdateHouseMutation(
    params: CreateUserUpdateHouseMutationVariables
): Promise<CreateUserUpdateHouseMutation> {
    const { data: { createUserUpdateHouse: userData } } = await client.mutate<
        CreateUserUpdateHouseMutation
    >({
        mutation: CREATE_USER_UPDATE_HOUSE_MUTATION,
        variables: { ...params }
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
    }

    createUser.fulfill();
};

const saveData = function*({ payload }) {
    yield put(getUserData.success(payload));
};

const houseLogin = function*({ payload }) {
    // Trigger request action
    yield put(createUserWithHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserCreateHouseMutation(payload);

        const user = Object.assign({}, result, { profile: payload });

        yield put(createUserWithHouse.success({ user }));
    } catch (error) {
        yield put(createUserWithHouse.failure(error));
    }

    createUserWithHouse.fulfill();
};

const joinHouse = function*({ payload }) {
    // Trigger request action
    yield put(createUserJoinHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserUpdateHouseMutation(payload);

        const user = Object.assign({}, result, { profile: payload });

        yield put(createUserJoinHouse.success({ user }));
    } catch (error) {
        yield put(createUserJoinHouse.failure(error));
    } finally {
        createUserJoinHouse.fulfill();
    }
};

const readOnly = function*() {
    yield put(readOnlyLogin.success());
};
