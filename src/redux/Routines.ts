import { createRoutine } from 'redux-saga-routines';

export const readOnlyLogin = createRoutine('READ_ONLY_LOGIN');
export const createUser = createRoutine('CREATE_USER');
export const createUserWithHouse = createRoutine('CREATE_USER_WITH_HOUSE');
export const createUserJoinHouse = createRoutine('CREATE_USER_JOIN_HOUSE');
export const getUserData = createRoutine('GET_USER_DATA');
export const completeHouseLogin = createRoutine('HOUSE_LOGIN');

export const getPosts = createRoutine('GET_POSTS');
export const createPost = createRoutine('CREATE_POST');
export const deletePost = createRoutine('DELETE_POST');
export const toggleFilter = createRoutine('TOGGLE_FILTER');

export const getReceivedApplications = createRoutine('GET_RECEIVED_APPLICATIONS');
export const getSentApplications = createRoutine('GET_SENT_APPLICATIONS');
export const createApplication = createRoutine('CREATE_APPLICATION');
export const deleteApplication = createRoutine('DELETE_APPLICATION');

export const getChatMessages = createRoutine('GET_CHAT_MESSAGES');
export const createMessage = createRoutine('SEND_MESSAGE');

export const createGroup = createRoutine('CREATE_GROUP');
