import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_LOGIN_QUERY = gql`
    query user($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            facebookUserId
        }
    }
    
`;
