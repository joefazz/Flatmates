import { call, put, takeEvery } from 'redux-saga/effects';

import Client from '../../Client';
import { createPost, getPosts } from '../Routines';







export const postSaga = function *() {
    yield takeEvery(getPosts.TRIGGER, posts);
    yield takeEvery(createPost.TRIGGER, create);
}

function *posts() {
    return;
}

function *create() {
    return;
}