import gql from 'graphql-tag';

export const CREATE_GROUP_MUTATION = gql`
    mutation CreateGroup(
        $playerID: String
        $approverName: String!
        $applicantName: String!
        $houseID: Int!
        $applicantID: ID!
        $housePlayerIDs: [String!]!
    ) {
        createGroup(
            playerID: $playerID
            applicantID: $applicantID
            applicantName: $applicantName
            houseID: $houseID
            approverName: $approverName
            housePlayerIDs: $housePlayerIDs
        ) {
            id
        }
    }
`;
