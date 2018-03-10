import * as Immutable from 'immutable';
import { ProfileAction, ProfileState } from '../../types/ReduxTypes';
import _ from '../../utils/localdash';
import initialState from '../InitialState';
import * as Types from '../Types';

// Modules
// File References
const INITIAL_STATE = Immutable.fromJS(initialState.profile);

export default function profileReducer(state: ProfileState = INITIAL_STATE, action: ProfileAction) {
    switch (action.type) {
    // Facebook Login Auth
    case Types.GET_USER_DATA_REQUEST:
        return state;
    case Types.GET_USER_DATA_SUCCESS:
        return state.merge({
            name: action.payload.response.name,
            firstName: action.payload.response.first_name,
            lastName: action.payload.response.last_name,
            gender: _.capitalize(action.payload.response.gender),
            birthday: action.payload.response.birthday,
            studyYear: action.payload.response.studyYear,
            course: action.payload.response.course,
            isSmoker: action.payload.response.isSmoker,
            email: action.payload.response.email,
            imageUrl: action.payload.response.picture.data.url
        });
    case Types.GET_USER_DATA_FAILURE:
        return state.merge({
            error: action.payload
        });
    case Types.GET_USER_DATA_FULFILL:
        return state;
    default:
        return state;
    }
}
