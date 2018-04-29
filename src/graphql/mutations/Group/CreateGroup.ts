import gql from 'graphql-tag';

export const CREATE_GROUP_MUTATION = gql`
    mutation CreateGroup($applicantID: ID!, $houseUserIDs: [ID!]!, $name: String!) {
        createGroup(applicantID: $applicantID, houseUserIDs: $houseUserIDs, name: $name) {
            id
        }
    }
`;
