import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
    mutation CreateMessage(
        $playerIDs: [String!]!
        $text: String!
        $senderID: ID!
        $senderName: String!
        $groupID: ID!
        $images: [String!]!
        $groupName: String!
    ) {
        createMessage(
            playerIDs: $playerIDs
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
            from {
                id
                name
                profilePicture
            }
        }
    }
`;
