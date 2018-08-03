import gql from 'graphql-tag';

export const COMPLETE_APPLICATION_MUTATION = gql`
    mutation CompleteApplication($id: ID!, $applicantID: ID!, $houseID: Int!, $houseName: String!, $applicantName: String!) {
        completeApplication(id: $id, applicantID: $applicantID, houseID: $houseID, houseName: $houseName, applicantName: $applicantName) {
            shortID
        }
    }
`