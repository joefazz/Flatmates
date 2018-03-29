import { FeedState, LoginState, ProfileState } from "../types/ReduxTypes";
import { LoginStatus } from "../types/Entities";

type State = Readonly<{ login: LoginState; profile: ProfileState; feed: FeedState }>;

const initialState: State = {
    login: {
        fbUserId: "",
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        grantedPermissions: [],
        deniedPermissions: [],
        fbAccessToken: "",
        isLoggedIn: false,
        isReadOnly: false,
        error: "",
        hasCreatedPost: false
    },
    profile: {
        name: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        email: "",
        imageUrl: "",
        error: "",
        houseId: undefined
    },
    feed: {
        posts: [],
        isFetchingPosts: false,
        isCreatingPost: false,
        isErrorFetchingPosts: false,
        isErrorCreatingPost: false,
        error: "",
        isAllFilterActive: true,
        isPriceFilterActive: false,
        isStarredFilterActive: false
    }
};

export default initialState;
