import { FeedAction, FeedState } from "../../types/ReduxTypes";
import { Post } from "../../types/Entities";
import initialState from "../InitialState";
import { GetPosts, CreatePost, ToggleFilter } from "../Types";
import { Filters } from "../../containers/Feed/PostList";

const INITIAL_STATE = initialState.feed;
let posts;

export default function feedReducer(state: FeedState = INITIAL_STATE, action: FeedAction) {
    switch (action.type) {
        // Get Posts
        case GetPosts.REQUEST:
            return Object.assign({}, state, {
                isFetchingPosts: true,
                isErrorFetchingPosts: false
            });
        case GetPosts.SUCCESS:
            return Object.assign({}, state, { posts: action.payload });
        case GetPosts.FAILURE:
            return Object.assign({}, state, {
                isErrorFetchingPosts: true,
                error: action.payload
            });
        case GetPosts.FULFILL:
            return Object.assign({}, state, { isFetchingPosts: false });

        // Create Post
        case CreatePost.REQUEST:
            return Object.assign({}, state, {
                isCreatingPost: true,
                isErrorCreatingPost: false
            });
        case CreatePost.SUCCESS:
            posts = state.posts.concat(action.payload as Post);

            return Object.assign({}, state, posts);
        case CreatePost.FAILURE:
            return Object.assign({}, state, {
                isErrorCreatingPost: true,
                error: action.payload
            });
        case CreatePost.FULFILL:
            return Object.assign({}, state, { isCreatingPost: false });

        case ToggleFilter.SUCCESS:
            if (action.payload === Filters.ALL) {
                return Object.assign({}, state, { isAllFilterActive: !state.isAllFilterActive });
            } else if (action.payload === Filters.MINE) {
                return Object.assign({}, state, { isPriceFilterActive: !state.isPriceFilterActive });
            } else if (action.payload === Filters.STARRED) {
                return Object.assign({}, state, { isStarredFilterActive: !state.isStarredFilterActive });
            }
            break;
        // Delete Post
        // case deletePost.REQUEST:
        //     return Object.assign({}, state, {
        //         isDeletingPost: true,
        //         isErrorDeletingPost: false
        //     });
        // case deletePost.SUCCESS:
        //     posts = state.posts;
        //     const postIndex = posts.findIndex((post) => post.id === action.payload);

        //     posts = posts.filter(({}, index) => index !== postIndex);

        //     return Object.assign({}, state, { posts });
        // case deletePost.FAILURE:
        //     return Object.assign({}, state, {
        //         isErrorDeletingPost: true,
        //         error: action.payload
        //     });
        // case deletePost.FULFILL:
        //     return Object.assign({}, state, { isDeletingPost: false });
        default:
            return state;
    }
}
