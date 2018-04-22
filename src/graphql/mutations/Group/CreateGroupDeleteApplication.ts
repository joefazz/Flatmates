import gql from 'graphql-tag';

export const CREATE_GROUP_DELETE_APPLICATION_MUTATION = gql`
    mutation CreateGroupDeleteApplication(
        $applicationID: ID!
        $applicantID: ID!
        $houseUserIDs: [ID!]!
        $name: String!
    ) {
        createGroupDeleteApplication(
            applicationID: $applicationID
            applicantID: $applicantID
            houseUserIDs: $houseUserIDs
            name: $name
        ) {
            id
        }
    }
`;
