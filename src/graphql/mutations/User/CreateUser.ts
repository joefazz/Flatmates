import gql from 'graphql-tag';


export const CREATE_USER_MUTATION = gql`
    mutation createUser($name: String!, $firstName: String!, $lastName: String!, $facebookUserId: String!, $email: String!, $imageUrl: String!, $birthday: String!, $gender: String!) {
        createUser(name: $name, firstName: $firstName, lastName: $lastName, facebookUserId: $facebookUserId, email: $email, imageUrl: $imageUrl, birthday: $birthday, gender: $gender) {
            facebookUserId
        }
    }
`;