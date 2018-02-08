import { createRoutine } from 'redux-saga-routines';

export const signupWithFacebook = createRoutine('SIGNUP_WITH_FACEBOOK');
export const loginWithFacebook = createRoutine('LOGIN_WITH_FACEBOOK');
export const getUserDataFacebook = createRoutine('GET_USER_DATA');