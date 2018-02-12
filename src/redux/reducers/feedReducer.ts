import * as Immutable from 'immutable';

import initialState from '../InitialState';
import { Action, State } from '../ReduxTypes';
import * as Types from '../Types';

const INITIAL_STATE = Immutable.fromJS(initialState.feed)
let posts;

export default function feedReducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
        // Get Posts
        case Types.GET_POSTS_REQUEST:
            return state.merge({
                isFetchingPosts: true,
                isErrorFetchingPosts: false
            });
        case Types.GET_POSTS_SUCCESS:
            return state.merge({
                posts: action.payload
            });
        case Types.GET_POSTS_FAILURE:
            return state.merge({
                isErrorFetchingPosts: true,
                error: action.payload.error
            });
        case Types.GET_POSTS_FULFILL:
            return state.merge({
                isFetchingPosts: false
            });

        // Create Post
        case Types.CREATE_POST_REQUEST:
            return state.merge({
                isCreatingPost: true,
                isErrorCreatingPost: false
            });
        case Types.CREATE_POST_SUCCESS:
            posts = state.get('posts').set(state.get('posts').size, action.payload);

            return state.merge({
                posts
            });
        case Types.CREATE_POST_FAILURE:
            return state.merge({
                isErrorCreatingPost: true,
                error: action.payload.error
            });
        case Types.CREATE_POST_FULFILL:
            return state.merge({
                isCreatingPost: false
            });
        default:
            return state;
    }
}
