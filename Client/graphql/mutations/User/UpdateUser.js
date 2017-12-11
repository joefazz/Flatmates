import gql from 'graphql-tag';


export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($id: ID!, $bio: String!, $course: String!, $minPrice: Int!, $maxPrice: Int!, $genderPreference: String!) {
        updateUser(id: $id, bio: $bio, course: $course, minPrice: $minPrice, maxPrice: $maxPrice, genderPreference: $genderPreference) {
            id
        }
    }
`;