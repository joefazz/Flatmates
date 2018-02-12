import { state } from '../navigators/Root';

const initialState = {
    login: {
        id: '',
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
    },
    nav: state
};

export default initialState;
