import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
    mutation CreateMessage(
        $text: String!
        $senderID: ID!
        $senderName: String!
        $groupID: ID!
        $images: [String!]!
        $groupName: String!
    ) {
        createMessage(
            text: $text
            senderID: $senderID
            senderName: $senderName
            groupID: $groupID
            images: $images
            groupName: $groupName
        ) {
            id
            createdAt
            text
            images
            from {
                id
                name
                profilePicture
            }
        }
    }
`;
