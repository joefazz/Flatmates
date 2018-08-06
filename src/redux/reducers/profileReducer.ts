import { ProfileState, ProfileAction } from '../../types/ReduxTypes';
import { CreateUser, CreateUserWithHouse, GetUserData, CreateUserJoinHouse, ValidateUserEmail, LeaveHouse } from '../Types';
import initialState from '../InitialState';

const INITIAL_STATE = initialState.profile;

export default function profileReducer(state: ProfileState = INITIAL_STATE, action: ProfileAction) {
    switch (action.type) {
        case CreateUser.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload.user
            });

        case GetUserData.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case CreateUserWithHouse.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case CreateUserJoinHouse.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ValidateUserEmail.SUCCESS:
            return Object.assign({}, state, { ...action.payload });

        case LeaveHouse.SUCCESS:
            return Object.assign({}, state, { house: null });

        default:
            return state;
    }
}
