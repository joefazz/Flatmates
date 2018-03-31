import * as Routines from './Routines';

// export enum Auth0Signup {
//     REQUEST = Routines.signupWithAuth0.REQUEST,
//     SUCCESS = Routines.signupWithAuth0.SUCCESS,
//     FAILURE = Routines.signupWithAuth0.FAILURE,
//     FULFILL = Routines.signupWithAuth0.FULFILL
// }

export enum Auth0Login {
    REQUEST = Routines.loginWithAuth0.REQUEST,
    SUCCESS = Routines.loginWithAuth0.SUCCESS,
    FAILURE = Routines.loginWithAuth0.FAILURE,
    FULFILL = Routines.loginWithAuth0.FULFILL
}

export enum GetUserData {
    REQUEST = Routines.getUserData.REQUEST,
    SUCCESS = Routines.getUserData.SUCCESS,
    FAILURE = Routines.getUserData.FAILURE,
    FULFILL = Routines.getUserData.FULFILL
}

export enum HouseLogin {
    SUCCESS = Routines.completeHouseLogin.SUCCESS,
    FAILURE = Routines.completeHouseLogin.FAILURE
}

export enum GetPosts {
    REQUEST = Routines.getPosts.REQUEST,
    SUCCESS = Routines.getPosts.SUCCESS,
    FAILURE = Routines.getPosts.FAILURE,
    FULFILL = Routines.getPosts.FULFILL
}

export enum CreatePost {
    REQUEST = Routines.createPost.REQUEST,
    SUCCESS = Routines.createPost.SUCCESS,
    FAILURE = Routines.createPost.FAILURE,
    FULFILL = Routines.createPost.FULFILL
}

export enum ToggleFilter {
    SUCCESS = Routines.toggleFilter.SUCCESS
}

export const READ_ONLY_LOGIN_SUCCESS = Routines.readOnlyLogin.SUCCESS;
