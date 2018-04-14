import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { getReceivedApplications, createApplication } from '../Routines';
import {
    HouseApplicationsQuery,
    CreateApplicationMutation,
    CreateApplicationMutationVariables
} from '../../graphql/Types';
import { HOUSE_APPLICATIONS_QUERY } from '../../graphql/queries';
import { CREATE_APPLICATION_MUTATION } from '../../graphql/mutations';

export const applicationSaga = function*() {
    yield takeEvery(getReceivedApplications.TRIGGER, get);
    yield takeEvery(createApplication.TRIGGER, create);
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
