import gql from 'graphql-tag';



export const USER_POST_QUERY = gql`
    query user($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            house {
                shortID
                spaces
                road
            }
        }
    }
`;