import gql from 'graphql-tag';

export const DELETE_APPLICATION_MUTATION = gql`
    mutation DeleteApplication($id: ID!, $road: String!, $applicantID: ID!, $houseID: Int!) {
        deleteApplication(id: $id, road: $road, applicantID: $applicantID, houseID: $houseID) {
            id
        }
    }
`;
