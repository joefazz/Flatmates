import { ApplicationState, ApplicationAction } from '../../types/ReduxTypes';
import { GetReceivedApplications, CreateApplication } from '../Types';
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

        case GetReceivedApplications.REQUEST:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetReceivedApplications.SUCCESS:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetReceivedApplications.FAILURE:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetReceivedApplications.FULFILL:
            return Object.assign({}, state, {
                /* state goes here */
            });

        default:
            return state;
    }
}
