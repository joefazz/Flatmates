import { ChatState, ChatAction } from '../../types/ReduxTypes';
import { GetMessages, CreateMessage } from '../Types';
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

        case CreateMessage.SUCCESS:
            return Object.assign({}, state, {
                messages: state.messages.concat(action.payload)
            });

        case CreateMessage.FAILURE:
            return Object.assign({}, state, { error: action.payload });
        default:
            return state;
    }
}
