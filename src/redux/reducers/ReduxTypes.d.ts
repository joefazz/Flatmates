declare enum LoginStatus {
    NOT_STARTED,
    STARTED,
    ENDED,
    FAILED
}

interface Action {
    type: string,
    payload: object
}

interface State {
    get: (string) => any,
    merge: (object) => any,
    login: {
        id: string,
        isRehydrated: boolean,
        loginStatus: LoginStatus,
        grantedPermissions: Array<string>,
        deniedPermissions: Array<string>,
        fbAccessToken: string,
        isLoggedIn: boolean
    },
    profile: {
        name: string,
        firstName: string,
        lastName: string,
        gender: string,
        birthday: string,
        email: string,
        imageUrl: string
    },
    feed: {
        posts: Array<object>,
        isFetchingPosts: boolean,
        isCreatingPosts: boolean,
        isErrorFetchingPosts: boolean,
        isErrorCreatingPosts: boolean,
        error: string
    },
    nav: any
}