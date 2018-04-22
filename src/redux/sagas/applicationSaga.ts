import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { getReceivedApplications, createApplication, createGroup } from '../Routines';
import {
    HouseApplicationsQuery,
    CreateApplicationMutation,
    CreateApplicationMutationVariables,
    CreateGroupDeleteApplicationMutationVariables,
    CreateGroupDeleteApplicationMutation
} from '../../graphql/Types';
import { HOUSE_APPLICATIONS_QUERY } from '../../graphql/queries';
import {
    CREATE_APPLICATION_MUTATION,
    CREATE_GROUP_DELETE_APPLICATION_MUTATION
} from '../../graphql/mutations';

export const applicationSaga = function*() {
    yield takeEvery(getReceivedApplications.TRIGGER, get);
    yield takeEvery(createApplication.TRIGGER, create);
    yield takeEvery(createGroup.TRIGGER, group);
};

async function getApplicationQuery(shortID: number): Promise<HouseApplicationsQuery> {
    const { data: house } = await client.query<HouseApplicationsQuery>({
        query: HOUSE_APPLICATIONS_QUERY,
        variables: { shortID }
    });

    return house;
}

async function createApplicationMutation(
    params: CreateApplicationMutationVariables
): Promise<CreateApplicationMutation> {
    const {
        data: { createApplication: applicationData }
    } = await client.mutate<CreateApplicationMutation>({
        mutation: CREATE_APPLICATION_MUTATION,
        variables: { ...params }
    });

    return applicationData;
}

async function createGroupMutation(
    params: CreateGroupDeleteApplicationMutationVariables
): Promise<CreateGroupDeleteApplicationMutation> {
    const {
        data: { createGroupDeleteApplication: groupData }
    } = await client.mutate({
        mutation: CREATE_GROUP_DELETE_APPLICATION_MUTATION,
        variables: { ...params }
    });

    return groupData;
}

function* get({ payload }) {
    // Trigger request action
    yield put(getReceivedApplications.request());
    // Wait for response from API and assign it to response
    try {
        const {
            house: { applications }
        } = yield getApplicationQuery(payload);

        yield put(getReceivedApplications.success({ applications }));
    } catch (error) {
        yield put(getReceivedApplications.failure(error));
    }

    yield put(getReceivedApplications.fulfill());
}

function* create({ payload }) {
    try {
        const result = yield createApplicationMutation(payload);
        yield put(createApplication.success({ result }));
    } catch (error) {
        yield put(createApplication.failure({ error }));
    }
}

function* group({ payload }) {
    try {
        const result = yield createGroupMutation(payload);
        yield put(createGroup.success({ result }));
    } catch (error) {
        yield put(createGroup.failure({ error }));
    }
}
