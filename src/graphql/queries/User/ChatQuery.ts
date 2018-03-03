import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_CHAT_QUERY = gql`
    query UserChat($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            name
            group {
                id
                name
            }
        }
    }
`;
