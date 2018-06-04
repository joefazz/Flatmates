import { ProfileState, ProfileAction } from '../../types/ReduxTypes';
import { CreateUser, CreateUserWithHouse, GetUserData, CreateUserJoinHouse } from '../Types';
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
        default:
            return state;
    }
}
