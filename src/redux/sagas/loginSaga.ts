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
    CreateUserUpdateHouseMutationVariables,
    LeaveHouseMutation,
    LeaveHouseMutationVariables
} from '../../graphql/Types';
import {
    getUserData,
    createUser,
    readOnlyLogin,
    createUserWithHouse,
    createUserJoinHouse,
    validateUserEmail,
    leaveHouse
} from '../Routines';
import OneSignal from 'react-native-onesignal';
import { LEAVE_HOUSE_MUTATION } from '../../graphql/mutations/User/LeaveHouse';

export const loginSaga = function* () {
    yield takeEvery(createUser.TRIGGER, login);
    yield takeEvery(getUserData.TRIGGER, saveData);
    yield takeEvery(readOnlyLogin.TRIGGER, readOnly);
    yield takeEvery(createUserWithHouse.TRIGGER, houseLogin);
    yield takeEvery(createUserJoinHouse.TRIGGER, joinHouse);
    yield takeEvery(validateUserEmail.TRIGGER, validate);
    yield takeEvery(leaveHouse.TRIGGER, leave);
};

async function createUserMutation(
    params: CreateUserMutationVariables
): Promise<CreateUserMutation> {
    const {
        data: { createUser: userData }
    } = await client.mutate<CreateUserMutation>({
        mutation: CREATE_USER_MUTATION,
        variables: { ...params },
        fetchPolicy: 'no-cache'
    });

    return userData;
}

async function createUserCreateHouseMutation(
    params: CreateUserCreateHouseMutationVariables
): Promise<CreateUserCreateHouseMutation> {
    const {
        data: { createUserCreateHouse: userData }
    } = await client.mutate<CreateUserCreateHouseMutation>({
        mutation: CREATE_USER_CREATE_HOUSE_MUTATION,
        variables: { ...params },
        fetchPolicy: 'no-cache'
    });

    return userData;
}

async function createUserUpdateHouseMutation(
    params: CreateUserUpdateHouseMutationVariables
): Promise<CreateUserUpdateHouseMutation> {
    const {
        data: { createUserUpdateHouse: userData }
    } = await client.mutate<CreateUserUpdateHouseMutation>({
        mutation: CREATE_USER_UPDATE_HOUSE_MUTATION,
        variables: { ...params },
        fetchPolicy: 'no-cache'
    });

    return userData;
}

async function leaveHouseMutation(
    params: LeaveHouseMutationVariables
): Promise<LeaveHouseMutation> {
    console.log(params)
    const {
        data: { leaveHouse }
    } = await client.mutate<LeaveHouseMutation>({
        mutation: LEAVE_HOUSE_MUTATION,
        variables: { ...params },
        fetchPolicy: 'no-cache'
    })

    return leaveHouse;
}

const login = function* ({ payload }) {
    // Trigger request action
    yield put(createUser.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserMutation(payload);

        const user = Object.assign({}, result, payload);

        yield put(createUser.success({ user }));

        OneSignal.sendTags({ user_id: result.id, username: result.name, house_id: null });
    } catch (error) {
        yield put(createUser.failure(error));
    }

    createUser.fulfill();
};

const validate = function* ({ payload }) {
    yield put(validateUserEmail.success({ email_validated: payload }))
};

const saveData = function* ({ payload }) {
    yield put(getUserData.success(payload));
};

const houseLogin = function* ({ payload }) {
    // Trigger request action
    yield put(createUserWithHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserCreateHouseMutation(payload);

        yield put(createUserWithHouse.success({ ...result }));

        OneSignal.sendTags({
            user_id: result.id,
            username: result.name,
            house_id: result.house.shortID
        });
    } catch (error) {
        yield put(createUserWithHouse.failure(error));
    }

    createUserWithHouse.fulfill();
};

const joinHouse = function* ({ payload }) {
    // Trigger request action
    yield put(createUserJoinHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield createUserUpdateHouseMutation(payload);

        yield put(createUserJoinHouse.success({ ...result }));

        OneSignal.sendTags({
            user_id: result.id,
            username: result.name,
            house_id: result.house.shortID
        });
    } catch (error) {
        yield put(createUserJoinHouse.failure(error));
    } finally {
        createUserJoinHouse.fulfill();
    }
};

const leave = function* ({ payload }) {
    yield put(leaveHouse.request());
    // Wait for response from API and assign it to response
    try {
        const result = yield leaveHouseMutation(payload);

        yield put(leaveHouse.success({ ...result }));

        OneSignal.deleteTag('house_id');
    } catch (error) {
        yield put(leaveHouse.failure(error));
    } finally {
        leaveHouse.fulfill();
    }
}

const readOnly = function* () {
    yield put(readOnlyLogin.success());
};
