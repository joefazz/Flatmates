import { Record } from 'immutable';
import initialState from '../redux/InitialState';
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
        error?: string
    }
}

export interface FeedAction extends GenericAction {
    payload: {
        error?: string
    }
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
                }
            }
        }
        error?: string;
    }
}

const loginRecord = Record(initialState.login);
const profileRecord = Record(initialState.profile);
const feedRecord = Record(initialState.feed);

export class LoginState extends loginRecord {
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

export class ProfileState extends profileRecord {
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    email: string;
    imageUrl: string;
    error: string;
}

export class FeedState extends feedRecord {
    posts: Array<Post>;
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    error: string;
}