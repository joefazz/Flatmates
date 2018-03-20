import { call, put, takeEvery, select } from "redux-saga/effects";

import Client from "../../Client";
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION } from "../../graphql/mutations";
import { POST_LIST_QUERY, USER_STARRED_POSTS_QUERY } from "../../graphql/queries";
import { createPost, deletePost, getPosts, toggleFilter } from "../Routines";
import { Filters } from "../../containers/Feed/PostList";
import { ReduxState } from "../../types/ReduxTypes";
import { Post } from "../../types/Entities";

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
    const currentPosts = yield select((state: ReduxState) => state.feed.posts);
    const isAllFilterActive = yield select((state: ReduxState) => state.feed.isAllFilterActive);
    const isPriceFilterActive = yield select((state: ReduxState) => state.feed.isPriceFilterActive);
    const isStarredFilterActive = yield select((state: ReduxState) => state.feed.isStarredFilterActive);

    if (payload === Filters.STARRED && !isStarredFilterActive) {
        const { data: { user: { starredPosts } } } = yield call(starredQuery, facebookUserId);

        if (starredPosts.length > 0) {
            let postsToBeAppended = [];
            starredPosts.forEach((post: Post) => {
                const existingPost = currentPosts.filter((curPost: Post) => {
                    return curPost.id === post.id;
                });

                if (existingPost.length === 0) {
                    postsToBeAppended = postsToBeAppended.concat(post);
                }
            });
            // yield action to append data to feed list
        }
    }

    if (payload === Filters.MINE && !isPriceFilterActive) {
        // do query to get data
        // call action to attach data to lost
    }

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
