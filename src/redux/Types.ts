import * as Routines from './Routines';

export enum CreateUser {
    REQUEST = Routines.createUser.REQUEST,
    SUCCESS = Routines.createUser.SUCCESS,
    FAILURE = Routines.createUser.FAILURE,
    FULFILL = Routines.createUser.FULFILL
}

export enum CreateUserWithHouse {
    REQUEST = Routines.createUserWithHouse.REQUEST,
    SUCCESS = Routines.createUserWithHouse.SUCCESS,
    FAILURE = Routines.createUserWithHouse.FAILURE,
    FULFILL = Routines.createUserWithHouse.FULFILL
}

export enum CreateUserJoinHouse {
    REQUEST = Routines.createUserJoinHouse.REQUEST,
    SUCCESS = Routines.createUserJoinHouse.SUCCESS,
    FAILURE = Routines.createUserJoinHouse.FAILURE,
    FULFILL = Routines.createUserJoinHouse.FULFILL
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
    SUCCESS = Routines.toggleFilter.SUCCESS,
    FAILURE = Routines.toggleFilter.FAILURE
}

export enum GetReceivedApplications {
    REQUEST = Routines.getReceivedApplications.REQUEST,
    SUCCESS = Routines.getReceivedApplications.SUCCESS,
    FAILURE = Routines.getReceivedApplications.FAILURE,
    FULFILL = Routines.getReceivedApplications.FULFILL
}

export enum GetSentApplications {
    REQUEST = Routines.getSentApplications.REQUEST,
    SUCCESS = Routines.getSentApplications.SUCCESS,
    FAILURE = Routines.getSentApplications.FAILURE,
    FULFILL = Routines.getSentApplications.FULFILL
}

export enum CreateApplication {
    SUCCESS = Routines.createApplication.SUCCESS,
    FAILURE = Routines.createApplication.FAILURE
}

export const READ_ONLY_LOGIN_SUCCESS = Routines.readOnlyLogin.SUCCESS;
