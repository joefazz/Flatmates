import gql from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
