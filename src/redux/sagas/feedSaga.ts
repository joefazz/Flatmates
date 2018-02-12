import { call, put, takeEvery } from 'redux-saga/effects';

import Client from '../../Client';
import { CREATE_POST_MUTATION } from '../../graphql/mutations';
import { POST_LIST_QUERY } from '../../graphql/queries';
import { createPost, getPosts } from '../Routines';
import store from '../store';

export const postSaga = function *() {
    yield takeEvery(getPosts.TRIGGER, posts);
    yield takeEvery(createPost.TRIGGER, create);
}

function *posts() {
    yield put(getPosts.request());

    try {
        const { data } = yield call (Client.query, {
            query: POST_LIST_QUERY,
            variables: {take: 10, skip: 0}
        });

        yield put(getPosts.success(data.allPosts));
    } catch (error) {
        yield put(getPosts.failure(error));
    } finally {
        yield put(getPosts.fulfill());
    }
}

function *create({payload}) {
    const { title, description, createdBy } = payload;

    yield put(createPost.request());

    try {
        const { data } = yield call(Client.mutate, {
            mutation: CREATE_POST_MUTATION,
            variables: {title, description, createdBy}
        });

        yield put(createPost.success({ data }))
    } catch (error) {
        yield put(createPost.failure(error));
    } finally {
        yield put(createPost.fulfill())
    }
}
