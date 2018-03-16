import { LoginStatus, StudyYear, House, Course } from "./Types";
import { Post } from "./Types";

export interface Login {
    fbUserId: string;
    isRehydrated: boolean;
    loginStatus: LoginStatus;
    grantedPermissions: string[];
    deniedPermissions: string[];
    fbAccessToken: string;
    isLoggedIn: boolean;
    isReadOnly: boolean;
}

// Course and StudyYear should be enums but i'm not sure how to convert an apollo response to enum
export interface Profile {
    name: string;
    firstName: string;
    lastName: string;
    bio: string;
    gender: string;
    birthday: string;
    email: string;
    imageUrl: string;
    studyYear: string;
    house: House;
    isSmoker: boolean;
    minPrice: number;
    maxPrice: number;
    genderPreference: string;
    course: string;
}

export interface Feed {
    posts: Post[];
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    error: string;
}
