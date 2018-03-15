import { Course, LoginStatus, Post, StudyYear } from './Types';

interface GenericAction {
    type: string;
}

export interface LoginAction extends GenericAction {
    payload: {
        token: string;
        expiryDate: number;
        response: {
            userID: string;
            deniedPermissions: Array<string>;
            grantedPermissions: Array<string>;
        };
        error?: string;
    };
}

export interface FeedAction extends GenericAction {
    payload: Post | { error?: string };
}

export interface ProfileAction extends GenericAction {
    payload: {
        response: {
            name: string;
            first_name: string;
            last_name: string;
            gender: string;
            birthday: string;
            studyYear: StudyYear;
            course: Course;
            isSmoker: boolean;
            email: string;
            picture: {
                data: {
                    url: string;
                };
            };
        };
        error?: string;
    };
}

export class LoginState {
    fbUserId: string;
    isRehydrated: boolean;
    loginStatus: LoginStatus;
    grantedPermissions: Array<string>;
    deniedPermissions: Array<string>;
    fbAccessToken: string;
    isLoggedIn: boolean;
    isReadOnly: boolean;
    error: string;
}

export class ProfileState {
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    email: string;
    imageUrl: string;
    error: string;
}

export class FeedState {
    posts: Array<Post>;
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    error: string;
}
