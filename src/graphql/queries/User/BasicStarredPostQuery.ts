import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_BASIC_STARRED_POSTS_QUERY = gql`
    query BasicStarred($id: ID!) {
        user(id: $id) {
            id
            starredPosts {
                id
            }
        }
    }
`;
