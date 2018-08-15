import gql from 'graphql-tag';

export const GET_CHAT_MESSAGES_QUERY = gql`
    query ChatMessages($id: ID!, $skip: Int) {
        group(id: $id) {
            id
            messages(last: 25, skip: $skip) {
                id
                createdAt
                text
                images
                to {
                    id
                }
                from {
                    id
                    name
                    profilePicture
                    house {
                        shortID
                    }
                }
            }
        }
    }
`;
