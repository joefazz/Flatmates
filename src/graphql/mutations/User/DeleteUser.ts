import gql from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($facebookUserId: String!) {
        deleteUser(facebookUserId: $facebookUserId) {
            facebookUserId
        }
    }
`;