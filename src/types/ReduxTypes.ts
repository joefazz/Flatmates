import {
    CreatePost,
    FacebookLogin,
    FacebookSignup,
    GetPosts,
    GetUserData,
    ToggleFilter,
    HouseLogin
} from "../redux/Types";
import { Course, LoginStatus, Post, StudyYear } from "./Entities";
import { Filters } from "../containers/Feed/PostList";

export interface LoginAction {
    type: FacebookLogin | FacebookSignup | CreatePost;
    payload: {
        token: string;
        expiryDate: number;
        response: {
            userID: string;
            deniedPermissions: Array<string>;
            grantedPermissions: Array<string>;
        };
        error: string;
    };
}

export interface FeedAction {
    type: GetPosts | CreatePost | ToggleFilter;
    payload: Post | Filters | { error?: string };
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
    fbUserId: string;
    isRehydrated: boolean;
    loginStatus: LoginStatus;
    grantedPermissions: Array<string>;
    deniedPermissions: Array<string>;
    fbAccessToken: string;
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
