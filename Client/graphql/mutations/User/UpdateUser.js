import gql from 'graphql-tag';


export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($id: String!, $bio: String!, $course: String!, minPrice: Double!, maxPrice: Double!, genderPreference: String!) {
        updateUser(id: $id, bio: $bio, course: $course, minPrice: $minPrice, maxPrice: $maxPrice, genderPreference: $genderPreference ) {
            id
        }
    }
`;