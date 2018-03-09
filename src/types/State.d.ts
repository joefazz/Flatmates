import { LoginStatus } from '../Types';
import { Post } from '../Types';

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
    
export interface Profile {
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    email: string;
    imageUrl: string
}

export interface Feed {
    posts: Post[];
    isFetchingPosts: boolean;
    isCreatingPost: boolean;
    isErrorFetchingPosts: boolean;
    isErrorCreatingPost: boolean;
    error: string;
}
