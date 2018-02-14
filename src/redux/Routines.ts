import { createRoutine } from 'redux-saga-routines';

export const signupWithFacebook = createRoutine('SIGNUP_WITH_FACEBOOK');
export const loginWithFacebook = createRoutine('LOGIN_WITH_FACEBOOK');
export const getUserDataFacebook = createRoutine('GET_USER_DATA');

export const getPosts = createRoutine('GET_POSTS');
export const createPost = createRoutine('CREATE_POST');
export const deletePost = createRoutine('DELETE_POST');