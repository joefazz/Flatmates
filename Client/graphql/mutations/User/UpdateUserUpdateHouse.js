import gql from 'graphql-tag';


export const UPDATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation updateUserUpdateHouse($id: ID!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $socialScore: Int!, $houseId: ID!) {
        updateUser(id: $id, bio: $bio, course: $course, studyYear $studyYear, isSmoker: $isSmoker, socialScore: $socialScore, houseId: $houseId) {
            id
            house {
                id
            }
        }
    }
`;