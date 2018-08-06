import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
    mutation CreateMessage(
        $text: String!
        $senderID: ID!
        $applicantID: ID
        $houseID: Int!
        $senderName: String!
        $groupID: ID!
        $images: [String!]!
        $groupName: String!
    ) {
        createMessage(
            text: $text
            senderID: $senderID
            applicantID: $applicantID
            houseID: $houseID
            senderName: $senderName
            groupID: $groupID
            images: $images
            groupName: $groupName
        ) {
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
`;
