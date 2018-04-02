import { LoginAction, LoginState, DataPayload, CreatePayload } from '../../types/ReduxTypes';
import { LoginStatus } from '../../types/Entities';
import initialState from '../InitialState';
import { CreateUser, CreatePost, CreateUserWithHouse, GetUserData } from '../Types';

// Modules
// File References
const INITIAL_STATE = initialState.login;

export default function loginReducer(state: LoginState = INITIAL_STATE, action: LoginAction) {
    switch (action.type) {
        // Read only login
        // case Types.READ_ONLY_LOGIN_SUCCESS:
        //     return Object.assign({}, state, {
        //         isReadOnlyEnabled: true
        //     });
        // Auth0 Login Auth
        case CreateUser.REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case CreateUser.SUCCESS:
            action.payload = action.payload as CreatePayload;
            return Object.assign({}, state, {
                ...action.payload.user,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case CreateUser.FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case CreateUser.FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        case CreatePost.SUCCESS:
            return Object.assign({}, state, {
                hasCreatedPost: true
            });

        case GetUserData.SUCCESS:
            const {
                id,
                name,
                firstName,
                lastName,
                profilePicture,
                age,
                gender,
                email,
                email_validated,
                isDruggie,
                isDrinker,
                isSmoker,
                bio,
                course,
                studyYear
            } = action.payload as DataPayload;

            return Object.assign({}, state, {
                id,
                name,
                profile: {
                    name,
                    firstName,
                    lastName,
                    profilePicture,
                    age,
                    gender,
                    email,
                    email_validated,
                    isDruggie,
                    isDrinker,
                    isSmoker,
                    bio,
                    course,
                    studyYear
                },
                isLoggedIn: true,
                loginStatus: LoginStatus.ENDED
            });

        case CreateUserWithHouse.REQUEST:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.STARTED
            });
        case CreateUserWithHouse.SUCCESS:
            action.payload = action.payload as CreatePayload;
            return Object.assign({}, state, {
                ...action.payload.user,
                isLoggedIn: true,
                loginStatus: LoginStatus.SUCCEED
            });
        case CreateUserWithHouse.FAILURE:
            return Object.assign({}, state, {
                error: action.payload,
                loginStatus: LoginStatus.FAILED
            });
        case CreateUserWithHouse.FULFILL:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.ENDED
            });

        case CreatePost.SUCCESS:
            return Object.assign({}, state, {
                hasCreatedPost: true
            });

        default:
            return state;
    }
}
