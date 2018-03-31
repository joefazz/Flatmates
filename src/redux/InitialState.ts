import { FeedState, LoginState, ProfileState } from '../types/ReduxTypes';
import { LoginStatus } from '../types/Entities';

type State = Readonly<{ login: LoginState; profile: ProfileState; feed: FeedState }>;

const initialState: State = {
    login: {
        userId: '',
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        isLoggedIn: false,
        isReadOnly: false,
        error: '',
        hasCreatedPost: false,
        auth_access_expiry: 0,
        auth_access_token: '',
        auth_id_token: '',
        auth_refresh_token: '',
        token_type: ''
    },
    profile: {
        name: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        email: '',
        imageUrl: '',
        error: '',
        houseId: undefined
    },
    feed: {
        posts: [],
        isFetchingPosts: false,
        isCreatingPost: false,
        isErrorFetchingPosts: false,
        isErrorCreatingPost: false,
        error: '',
        isAllFilterActive: true,
        isPriceFilterActive: false,
        isStarredFilterActive: false
    }
};

export default initialState;
