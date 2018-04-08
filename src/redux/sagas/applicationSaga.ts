import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import { getApplications } from '../Routines';
import { HouseApplicationsQuery } from '../../graphql/Types';
import { HOUSE_APPLICATIONS_QUERY } from '../../graphql/queries';

export const applicationSaga = function*() {
    yield takeEvery(getApplications.TRIGGER, get);
    // yield takeEvery(createApplication.TRIGGER, create);
};

async function getApplicationQuery(shortID: number): Promise<HouseApplicationsQuery> {
    const { data: house } = await client.query<HouseApplicationsQuery>({
        query: HOUSE_APPLICATIONS_QUERY,
        variables: { shortID }
    });

    return house;
}

const get = function*({ payload }) {
    // Trigger request action
    yield put(getApplications.request());
    // Wait for response from API and assign it to response
    try {
        const { house: { applications } } = yield getApplicationQuery(payload.shortID);

        yield put(getApplications.success({ applications }));
    } catch (error) {
        yield put(getApplications.failure(error));
    }

    getApplications.fulfill();
};
