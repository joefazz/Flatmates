import { call, put, takeEvery } from 'redux-saga/effects';

import Client from '../../Client';
import { createPost, getPosts } from '../Routines';






export const postSaga = function *() {
    yield takeEvery(getPosts.TRIGGER, getPosts);
    yield takeEvery(createPost.TRIGGER, createPost);
}

function *getPosts() {
    return;
}

function *createPost() {
    return;
}