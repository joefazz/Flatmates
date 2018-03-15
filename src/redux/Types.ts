import * as Routines from "./Routines";

export enum FacebookSignup {
    REQUEST = Routines.signupWithFacebook.REQUEST,
    SUCCESS = Routines.signupWithFacebook.SUCCESS,
    FAILURE = Routines.signupWithFacebook.FAILURE,
    FULFILL = Routines.signupWithFacebook.FULFILL
}

export enum FacebookLogin {
    REQUEST = Routines.loginWithFacebook.REQUEST,
    SUCCESS = Routines.loginWithFacebook.SUCCESS,
    FAILURE = Routines.loginWithFacebook.FAILURE,
    FULFILL = Routines.loginWithFacebook.FULFILL
}

export enum GetUserData {
    REQUEST = Routines.getUserDataFacebook.REQUEST,
    SUCCESS = Routines.getUserDataFacebook.SUCCESS,
    FAILURE = Routines.getUserDataFacebook.FAILURE,
    FULFILL = Routines.getUserDataFacebook.FULFILL
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

export const READ_ONLY_LOGIN_SUCCESS = Routines.readOnlyLogin.SUCCESS;
