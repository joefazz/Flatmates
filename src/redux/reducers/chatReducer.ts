import { ChatState, ChatAction } from '../../types/ReduxTypes';
import { GetMessages } from '../Types';
import initialState from '../InitialState';

const INITIAL_STATE = initialState.chat;

export default function applicationReducer(state: ChatState = INITIAL_STATE, action: ChatAction) {
    switch (action.type) {
        case GetMessages.REQUEST:
            return Object.assign({}, state, {
                isFetchingMessages: true
            });
        case GetMessages.SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        case GetMessages.FAILURE:
            return Object.assign({}, state, {
                error: action.payload
            });
        case GetMessages.FULFILL:
            return Object.assign({}, state, {
                isFetchingMessages: false
            });
        default:
            return state;
    }
}
