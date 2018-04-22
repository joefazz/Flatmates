import gql from 'graphql-tag';

export const CREATE_GROUP_DELETE_APPLICATION_MUTATION = gql`
    mutation CreateGroupDeleteApplication(
        $applicationID: String!
        $applicantID: String!
        $houseUserIDs: Int!
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
