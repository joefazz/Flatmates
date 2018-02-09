import gql from 'graphql-tag';

export const UPDATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation updateUserUpdateHouse($facebookUserId: String!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $socialScore: Int!, $houseId: Int!) {
        updateUserUpdateHouse(facebookUserId: $facebookUserId, bio: $bio, course: $course, studyYear: $studyYear, isSmoker: $isSmoker, socialScore: $socialScore, houseId: $houseId) {
            facebookUserId
            house {
                shortID
            }
        }
    }
`;