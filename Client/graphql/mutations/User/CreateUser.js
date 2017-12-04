import gql from 'graphql-tag';


export const CREATE_USER_MUTATION = gql`
    mutation createUser($name: String!, $facebookUserId: String!, $email: String!) {
        createUser(name: $name, facebookUserId: $facebookUserId, email: $email) {
            id
            name
            email
        }
    }
`;