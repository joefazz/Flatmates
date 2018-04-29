import gql from 'graphql-tag';

export const DELETE_APPLICATION_MUTATION = gql`
    mutation DeleteApplication($id: ID!) {
        deleteApplication(id: $id) {
            id
        }
    }
`;
