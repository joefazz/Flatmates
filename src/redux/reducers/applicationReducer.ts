import { ApplicationState, ApplicationAction } from '../../types/ReduxTypes';
import { GetReceivedApplications, GetSentApplications, CreateApplication } from '../Types';
import initialState from '../InitialState';

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
                isFetchingReceivedApplications: true
            });
        case GetReceivedApplications.SUCCESS:
            return Object.assign({}, state, {
                received: action.payload.applications
            });
        case GetReceivedApplications.FAILURE:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetReceivedApplications.FULFILL:
            return Object.assign({}, state, {
                isFetchingReceivedApplications: false
            });

        case GetSentApplications.REQUEST:
            return Object.assign({}, state, {
                isFetchingSentApplications: true
            });
        case GetSentApplications.SUCCESS:
            return Object.assign({}, state, {
                sent: action.payload.applications
            });
        case GetSentApplications.FAILURE:
            return Object.assign({}, state, {
                /* state goes here */
            });
        case GetSentApplications.FULFILL:
            return Object.assign({}, state, {
                isFetchingSentApplications: false
            });

        default:
            return state;
    }
}
