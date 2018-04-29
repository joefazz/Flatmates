import gql from 'graphql-tag';

export const GET_CHAT_MESSAGES_QUERY = gql`
    query ChatMessages($id: ID!) {
        group(id: $id) {
            messages {
                id
                createdAt
                text
                from {
                    id
                    name
                    profilePicture
                }
            }
        }
    }
`;
