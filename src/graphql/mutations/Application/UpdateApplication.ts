import gql from 'graphql-tag';

export const UPDATE_APPLICATION_MUTATION = gql`
    mutation UpdateApplication($id: ID!, $isActive: Boolean!) {
        updateApplication(id: $id, isActive: $isActive) {
            id
            isActive
        }
    }
`