import { ProfileAction, ProfileState } from '../../types/ReduxTypes';
import _ from '../../utils/localdash';
import initialState from '../InitialState';
import { HouseLogin } from '../Types';
// Modules
// File References
const INITIAL_STATE = initialState.profile;

export default function profileReducer(state: ProfileState = INITIAL_STATE, action: ProfileAction) {
    switch (action.type) {
        // Facebook Login Auth
        // case GetUserData.REQUEST:
        //     return state;
        // case GetUserData.SUCCESS:
        //     return Object.assign({}, state, {
        //         name: action.payload.response.name,
        //         firstName: action.payload.response.first_name,
        //         lastName: action.payload.response.last_name,
        //         gender: _.capitalize(action.payload.response.gender),
        //         birthday: action.payload.response.birthday,
        //         studyYear: action.payload.response.studyYear,
        //         course: action.payload.response.course,
        //         isSmoker: action.payload.response.isSmoker,
        //         email: action.payload.response.email,
        //         imageUrl: action.payload.response.picture.data.url
        //     });
        // case GetUserData.FAILURE:
        //     return Object.assign({}, state, {
        //         error: action.payload
        //     });
        // case GetUserData.FULFILL:
        //     return state;

        case HouseLogin.SUCCESS:
            return Object.assign({}, state, {
                houseID: action.payload
            });
        default:
            return state;
    }
}
