import { createRoutine } from 'redux-saga-routines';

export const readOnlyLogin = createRoutine('READ_ONLY_LOGIN');
export const loginWithAuth0 = createRoutine('LOGIN_WITH_AUTH0');
export const getUserData = createRoutine('GET_USER_DATA');
export const completeHouseLogin = createRoutine('HOUSE_LOGIN');

export const getPosts = createRoutine('GET_POSTS');
export const createPost = createRoutine('CREATE_POST');
export const deletePost = createRoutine('DELETE_POST');
export const toggleFilter = createRoutine('TOGGLE_FILTER');
