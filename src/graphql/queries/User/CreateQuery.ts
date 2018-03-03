import gql from 'graphql-tag';

export const USER_POST_QUERY = gql`
    query UserPost($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            house {
                shortID
                spaces
                road
            }
        }
    }
`;