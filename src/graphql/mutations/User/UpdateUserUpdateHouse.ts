import gql from 'graphql-tag';

export const UPDATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation UpdateUserUpdateHouse($facebookUserId: String!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $houseId: Int!) {
        updateUserUpdateHouse(facebookUserId: $facebookUserId, bio: $bio, course: $course, studyYear: $studyYear, isSmoker: $isSmoker, houseId: $houseId) {
            facebookUserId
            house {
                shortID
            }
        }
    }
`;