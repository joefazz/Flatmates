import gql from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser($facebookUserId: String!) {
        deleteUser(facebookUserId: $facebookUserId) {
            facebookUserId
        }
    }
`;