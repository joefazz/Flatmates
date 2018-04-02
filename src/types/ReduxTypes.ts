import {
    CreatePost,
    CreateUser,
    GetUserData,
    GetPosts,
    ToggleFilter,
    HouseLogin,
    CreateUserWithHouse
} from '../redux/Types';
import { Course, LoginStatus, Post, StudyYear } from './Entities';
import { Filters } from '../containers/Feed/PostList';
import { CreateUserMutation } from '../graphql/Types';

export interface LoginAction {
    type: CreateUser | CreateUserWithHouse | CreatePost | GetUserData;
    payload: DataPayload | CreatePayload;
}

export interface DataPayload extends ProfileState {
    id: string;
    name: string;
}

export interface CreatePayload {
    user: CreateUserMutation;
    error: string;
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
    id: string;
    name: string;
    profile: ProfileState;
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
    profilePicture: string;
    age: number;
    gender: string;
    email: string;
    email_validated: boolean;
    isDruggie: boolean;
    isDrinker: boolean;
    isSmoker: boolean;
    bio: string;
    course: string;
    studyYear: string;
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
