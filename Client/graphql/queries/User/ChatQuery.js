import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_CHAT_QUERY = gql`
    query User($facebookUserId: String!) {
        User(facebookUserId: $facebookUserId) {
            group {
                id
                name
            }
        }
    }
`;
