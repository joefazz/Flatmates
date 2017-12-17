import gql from 'graphql-tag';


export const UPDATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation updateUserUpdateHouse($id: ID!, $bio: String!, $course: String!, $houseId: ID!) {
        updateUser(id: $id, bio: $bio, course: $course, houseId: $houseId) {
            id
            house {
                id
            }
        }
    }
`;