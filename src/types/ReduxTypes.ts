import {
    CreatePost,
    Auth0Login,
    GetUserData,
    GetPosts,
    ToggleFilter,
    HouseLogin
} from '../redux/Types';
import { Course, LoginStatus, Post, StudyYear } from './Entities';
import { Filters } from '../containers/Feed/PostList';

export interface LoginAction {
    type: Auth0Login | CreatePost;
    payload: {
        creds: {
            accessToken: string;
            refreshToken: string;
            idToken: string;
            expiresIn: number;
            tokenType: string;
        };
        error: string;
    };
}

export interface FeedAction {
    type: GetPosts | CreatePost | ToggleFilter;
    payload: Post | { error: string } | { filterSelected?: Filters; posts?: Array<Post> };
}

export interface ToggleFilterAction {
    filterSelected?: Filters;
    posts: Array<Post>;
}

export interface ProfileAction {
    type: GetUserData | HouseLogin;
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
        error: string;
        houseID: number;
    };
}

export interface LoginState {
    auth_access_token: string;
    auth_refresh_token: string;
    auth_access_expiry: number;
    auth_id_token: string;
    token_type: string;
    userId: string;
    isRehydrated: boolean;
    loginStatus: LoginStatus;
    isLoggedIn: boolean;
    isReadOnly: boolean;
    error: string;
    hasCreatedPost: boolean;
}

export interface ProfileState {
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    email: string;
    imageUrl: string;
    error: string;
    houseId?: number;
}

export interface FeedState {
    posts: Array<Post>;
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    isAllFilterActive: boolean;
    isStarredFilterActive: boolean;
    isPriceFilterActive: boolean;
    error: string;
}

export interface ReduxState {
    profile: ProfileState;
    feed: FeedState;
    login: LoginState;
}
