import { LoginStatus } from './ReduxTypes';

const initialState = {
    login: {
        fbUserId: '',
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        grantedPermissions: [],
        deniedPermissions: [],
        fbAccessToken: '',
        isLoggedIn: false
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
