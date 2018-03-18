import { call, put, takeEvery, select } from "redux-saga/effects";

import Client from "../../Client";
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION } from "../../graphql/mutations";
import { POST_LIST_QUERY, USER_STARRED_POSTS_QUERY } from "../../graphql/queries";
import { createPost, deletePost, getPosts, toggleFilter } from "../Routines";
import { Filters } from "../../containers/Feed/PostList";
import { ReduxState } from "../../types/ReduxTypes";

export const postSaga = function*() {
    yield takeEvery(getPosts.TRIGGER, posts);
    yield takeEvery(createPost.TRIGGER, create);
    yield takeEvery(deletePost.TRIGGER, remove);
    yield takeEvery(toggleFilter.TRIGGER, toggleFilters);
};

async function starredQuery(facebookUserId) {
    return await Client.query({ query: USER_STARRED_POSTS_QUERY, variables: { facebookUserId } });
}

function* posts() {
    yield put(getPosts.request());

    try {
        const { data: { allPosts } } = yield call(Client.query, {
            query: POST_LIST_QUERY,
            variables: { take: 10 }
        });

        yield put(getPosts.success(allPosts));
    } catch (error) {
        yield put(getPosts.failure(error));
    } finally {
        yield put(getPosts.fulfill());
    }
}

function* toggleFilters({ payload }) {
    const facebookUserId = yield select((state: ReduxState) => state.login.fbUserId);
    const dataToBeAppended = yield call(starredQuery, facebookUserId);

    yield put(toggleFilter.success(payload));
}

function* create({ payload }) {
    const { description, createdBy } = payload;

    yield put(createPost.request());

    try {
        const { data } = yield call(Client.mutate, {
            mutation: CREATE_POST_MUTATION,
            variables: { description, createdBy }
        });

        const post = data.createPost;

        yield put(createPost.success(post));
    } catch (error) {
        yield put(createPost.failure(error));
    } finally {
        yield put(createPost.fulfill());
    }
}

function* remove({ payload }) {
    const { id } = payload;

    yield put(deletePost.request());

    try {
        yield call(Client.mutate, {
            mutation: DELETE_POST_MUTATION,
            variables: { id }
        });

        yield put(deletePost.success(id));
    } catch (error) {
        yield put(deletePost.failure(error));
    } finally {
        yield put(deletePost.fulfill());
    }
}
