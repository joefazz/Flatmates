import {
    FeedState,
    LoginState,
    ProfileState,
    ApplicationState,
    ChatState
} from '../types/ReduxTypes';
import { LoginStatus } from '../types/Entities';

type State = Readonly<{
    login: LoginState;
    profile: ProfileState;
    feed: FeedState;
    applications: ApplicationState;
    chat: ChatState;
}>;

const initialState: State = {
    login: {
        id: '',
        name: '',
        authId: '',
        email: '',
        isRehydrated: false,
        loginStatus: LoginStatus.NOT_STARTED,
        isLoggedIn: false,
        hasSeenWarning: false,
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
        isSmoker: false,
        house: {
            shortId: 0,
            road: '',
            billsPrice: 0,
            rentPrice: 0,
            coords: [],
            houseImages: []
        }
    }
};

export default initialState;
