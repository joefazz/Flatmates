import { FeedState, LoginState, ProfileState } from '../types/ReduxTypes';
import { LoginStatus } from '../types/Entities';

type State = Readonly<{ login: LoginState; profile: ProfileState; feed: FeedState }>;

const initialState: State = {
    login: {
        id: '',
        name: '',
        authId: '',
        email: '',
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        isLoggedIn: false,
        isReadOnly: false,
        error: '',
        hasCreatedPost: false
    },
    profile: {
        name: '',
        email: '',
        email_validated: false,
        firstName: '',
        lastName: '',
        age: 0,
        profilePicture: '',
        gender: '',
        studyYear: '',
        course: '',
        bio: '',
        isDrinker: false,
        isDruggie: false,
        isSmoker: false
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
