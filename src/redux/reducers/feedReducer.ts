import * as Immutable from 'immutable';

import { FeedAction, FeedState } from '../../types/ReduxTypes';
import initialState from '../InitialState';
import { createPost, deletePost, getPosts } from '../Routines';

const INITIAL_STATE = Immutable.fromJS(initialState.feed)
let posts;

export default function feedReducer(state: FeedState = INITIAL_STATE, action: FeedAction) {
    switch (action.type) {
        // Get Posts
        case getPosts.REQUEST:
            return state.merge({
                isFetchingPosts: true,
                isErrorFetchingPosts: false
            });
        case getPosts.SUCCESS:
            return state.merge({
                posts: action.payload
            });
        case getPosts.FAILURE:
            return state.merge({
                isErrorFetchingPosts: true,
                error: action.payload.error
            });
        case getPosts.FULFILL:
            return state.merge({
                isFetchingPosts: false
            });

        // Create Post
        case createPost.REQUEST:
            return state.merge({
                isCreatingPost: true,
                isErrorCreatingPost: false
            });
        case createPost.SUCCESS:
            posts = state.get('posts').set(state.get('posts').size, action.payload);

            return state.merge({
                posts
            });
        case createPost.FAILURE:
            return state.merge({
                isErrorCreatingPost: true,
                error: action.payload.error
            });
        case createPost.FULFILL:
            return state.merge({
                isCreatingPost: false
            });

        // Delete Post
        case deletePost.REQUEST:
            return state.merge({
                isDeletingPost: true,
                isErrorDeletingPost: false
            })
        case deletePost.SUCCESS:
            posts = state.get('posts');
            const postIndex = posts.findIndex((post) => post.get('id') === action.payload);

            posts = posts.delete(postIndex);

            return state.merge({
                posts
            });
        case deletePost.FAILURE:
            return state.merge({
                isErrorDeletingPost: true,
                error: action.payload.error
            });
        case deletePost.FULFILL:
            return state.merge({
                isDeletingPost: false,
            })
        default:
            return state;
    }
}
