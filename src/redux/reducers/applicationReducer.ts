import { ApplicationState, ApplicationAction } from '../../types/ReduxTypes';
import { GetApplications, CreateApplication } from '../Types';
import initialState from '../InitialState';
import { createUserJoinHouse } from '../Routines';

const INITIAL_STATE = initialState.applications;

export default function applicationReducer(
    state: ApplicationState = INITIAL_STATE,
    action: ApplicationAction
) {
    switch (action.type) {
        case CreateApplication.SUCCESS:
            return Object.assign({}, state, {
                sent: action.payload
            });

        case GetApplications.REQUEST:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetApplications.SUCCESS:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetApplications.FAILURE:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetApplications.FULFILL:
            return Object.assign({}, state, {
                /* state goes here */
            });

        default:
            return state;
    }
}
