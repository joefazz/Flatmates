import gql from "graphql-tag";

export const ADD_APPLICATIONS_MUTATION = gql`
    mutation AddApplications($id: ID!, $newAllowance: Int!) {
        addApplications(id: $id, newAllowance: $newAllowance) {
            id
            applicationAllowance
        }
    }
`