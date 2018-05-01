import gql from 'graphql-tag';

export const CREATE_GROUP_MUTATION = gql`
    mutation CreateGroup(
        $playerID: String
        $approverName: String!
        $applicantID: ID!
        $houseUserIDs: [ID!]!
        $name: String!
    ) {
        createGroup(
            playerID: $playerID
            applicantID: $applicantID
            approverName: $approverName
            houseUserIDs: $houseUserIDs
            name: $name
        ) {
            id
        }
    }
`;
