import { ProfileState, ProfileAction } from '../../types/ReduxTypes';
import { CreateUser, CreatePost, CreateUserWithHouse, GetUserData } from '../Types';
import initialState from '../InitialState';

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
                shortID,
                road,
                billsPrice,
                rentPrice,
                coords,
                houseImages,
                rentDue,
                billsDue
            } = action.payload.user.profile;
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
                isSmoker
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
        default:
            return state;
    }
}
