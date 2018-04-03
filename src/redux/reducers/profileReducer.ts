import { ProfileState, ProfileAction } from '../../types/ReduxTypes';
import {
    CreateUser,
    CreatePost,
    CreateUserWithHouse,
    GetUserData,
    CreateUserJoinHouse
} from '../Types';
import initialState from '../InitialState';
import { createUserJoinHouse } from '../Routines';

const INITIAL_STATE = initialState.profile;

export default function profileReducer(state: ProfileState = INITIAL_STATE, action: ProfileAction) {
    switch (action.type) {
        case CreateUser.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload.user.profile
            });

        case GetUserData.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });

        case CreateUserWithHouse.SUCCESS:
            const {
                name,
                firstName,
                lastName,
                email,
                email_validated,
                age,
                bio,
                course,
                studyYear,
                gender,
                profilePicture,
                isDrinker,
                isDruggie,
                isSmoker,
                shortID,
                road,
                billsPrice,
                rentPrice,
                coords,
                houseImages,
                rentDue,
                billsDue
            } = action.payload.user.profile;

            return Object.assign({}, state, {
                name,
                firstName,
                lastName,
                email,
                email_validated,
                age,
                gender,
                bio,
                course,
                studyYear,
                profilePicture,
                isDrinker,
                isSmoker,
                isDruggie,
                house: {
                    shortID,
                    road,
                    billsPrice,
                    rentPrice,
                    coords,
                    houseImages,
                    rentDue,
                    billsDue
                }
            });

        case CreateUserJoinHouse.SUCCESS:
            return Object.assign({}, state, {
                name: action.payload.user.profile.name,
                firstName: action.payload.user.profile.firstName,
                lastName: action.payload.user.profile.lastName,
                email: action.payload.user.profile.email,
                email_validated: action.payload.user.profile.email_validated,
                age: action.payload.user.profile.age,
                gender: action.payload.user.profile.gender,
                bio: action.payload.user.profile.bio,
                course: action.payload.user.profile.course,
                studyYear: action.payload.user.profile.studyYear,
                profilePicture: action.payload.user.profile.profilePicture,
                isDrinker: action.payload.user.profile.isDrinker,
                isSmoker: action.payload.user.profile.isSmoker,
                isDruggie: action.payload.user.profile.isDruggie,
                house: {
                    shortID: action.payload.user.profile.shortID
                }
            });
        default:
            return state;
    }
}
