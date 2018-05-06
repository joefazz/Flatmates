import { put, takeEvery } from 'redux-saga/effects';

import client from '../../Client';
import {
    getReceivedApplications,
    createApplication,
    createGroup,
    deleteApplication
} from '../Routines';
import {
    HouseApplicationsQuery,
    CreateApplicationMutation,
    CreateApplicationMutationVariables,
    CreateGroupMutationVariables,
    CreateGroupMutation,
    DeleteApplicationMutation,
    UserChatQuery
} from '../../graphql/Types';
import { HOUSE_APPLICATIONS_QUERY, USER_CHAT_QUERY } from '../../graphql/queries';
import {
    CREATE_APPLICATION_MUTATION,
    CREATE_GROUP_MUTATION,
    DELETE_APPLICATION_MUTATION
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
    params: CreateGroupMutationVariables & { approverID: string }
): Promise<CreateGroupMutation> {
    console.log(params);
    const {
        data: { createGroup: groupData }
    } = await client.mutate({
        mutation: CREATE_GROUP_MUTATION,
        variables: { ...params },
        update: (store, { data: { createGroup } }) => {
            const groups: UserChatQuery = store.readQuery({
                query: USER_CHAT_QUERY,
                variables: {
                    id: params.approverID
                }
            });

            groups.user.groups.push(createGroup);

            store.writeQuery({
                query: USER_CHAT_QUERY,
                variables: {
                    id: params.approverID
                }
            });
        }
    });

    return groupData;
}

async function deleteApplicationMutation(
    applicationID: string
): Promise<DeleteApplicationMutation> {
    const {
        data: { deleteApplicationMutation: id }
    } = await client.mutate({
        mutation: DELETE_APPLICATION_MUTATION,
        variables: { id: applicationID }
    });

    return id;
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

function* remove(id: string) {
    try {
        const appID = yield deleteApplicationMutation(id);
        yield put(deleteApplication.success({ appID }));
    } catch (error) {
        yield put(deleteApplication.failure({ error }));
    }
}

function* group({ payload }) {
    const { id, applicantID, houseUserIDs, name, approverName } = payload;
    try {
        const result = yield createGroupMutation({ applicantID, houseUserIDs, name, approverName });
        yield put(createGroup.success({ result }));

        yield remove(id);
    } catch (error) {
        yield put(createGroup.failure({ error }));
    }
}
