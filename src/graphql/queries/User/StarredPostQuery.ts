import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_STARRED_POSTS_QUERY = gql`
    query UserStarred($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            facebookUserId
            starredPosts {
                id
                description
                createdAt
                lastSeen
                createdBy {
                    road
                    coords
                    billsPrice
                    rentPrice
                    spaces
                    houseImages
                }
            }
        }
    }
`;
