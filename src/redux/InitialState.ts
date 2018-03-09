import { LoginStatus } from '../types/Types';

const initialState = {
    login: {
        fbUserId: '',
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        grantedPermissions: [],
        deniedPermissions: [],
        fbAccessToken: '',
        isLoggedIn: false,
        isReadOnly: false
    },
    profile: {
        name: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        email: '',
        imageUrl: ''
    },
    feed: {
        posts: [],
        isFetchingPosts: false,
        isCreatingPost: false,
        isErrorFetchingPosts: false,
        isErrorCreatingPost: false,
        error: '',
    }
};

export default initialState;
