import {
    CreatePost,
    CreateUser,
    GetUserData,
    GetPosts,
    ToggleFilter,
    HouseLogin,
    CreateUserWithHouse,
    CreateUserJoinHouse,
    CreateApplication,
    GetReceivedApplications,
    GetSentApplications
} from '../redux/Types';
import {
    Course,
    ChatGroup,
    LoginStatus,
    Post,
    StudyYear,
    User,
    Message,
    Application
} from './Entities';
import { Filters } from '../containers/Feed/PostList';
import { CreateUserMutation } from '../graphql/Types';

export interface LoginAction {
    type: CreateUser | CreateUserWithHouse | CreateUserJoinHouse | CreatePost | GetUserData;
    payload: DataPayload | CreatePayload;
}

export interface DataPayload extends ProfileState {
    id: string;
    name: string;
    authId: string;
}

export interface CreatePayload {
    user: any;
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
    type: GetUserData | HouseLogin | CreateUserWithHouse | CreateUser | CreateUserJoinHouse;
    payload: {
        user: any;
        error: string;
        houseID: number;
    };
}

export interface ApplicationAction {
    type: CreateApplication | GetReceivedApplications | GetSentApplications;
    payload: any;
}

export type ChatState = Array<ChatGroup>;

export interface LoginState {
    id: string;
    name: string;
    email: string;
    authId: string;
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
    house: {
        shortId: number;
        road: string;
        billsPrice: number;
        rentPrice: number;
        coords: Array<number>;
        houseImages: Array<string>;
        rentDue?: number;
        billsDue?: number;
    };
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

export interface ApplicationState {
    sent: Array<Application>;
    received: Array<Application>;
    isFetchingSentApplications: boolean;
    isFetchingReceivedApplications: boolean;
}

export interface ReduxState {
    profile: ProfileState;
    feed: FeedState;
    login: LoginState;
    applications: ApplicationState;
}
