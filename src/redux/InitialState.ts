import { FeedState, LoginState } from '../types/ReduxTypes';
import { LoginStatus } from '../types/Entities';

type State = Readonly<{ login: LoginState; feed: FeedState }>;

const initialState: State = {
    login: {
        id: '',
        name: '',
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
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        isLoggedIn: false,
        isReadOnly: false,
        error: '',
        hasCreatedPost: false
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
