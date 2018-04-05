import { LoginStatus, StudyYear, House, Course } from './Types';
import { Post } from './Types';

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
    age: string;
    email: string;
    email_validated: boolean;
    profilePicture: string;
    studyYear: string;
    house: House;
    minPrice: number;
    maxPrice: number;
    genderPreference: string;
    course: string;
    isDrinker: boolean;
    isDruggie: false;
    isSmoker: false;
}

export interface Feed {
    posts: Post[];
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    error: string;
}
