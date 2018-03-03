import gql from 'graphql-tag';

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($facebookUserId: String!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $socialScore: Int!, $minPrice: Int!, $maxPrice: Int!, $genderPreference: String!) {
        updateUser(facebookUserId: $facebookUserId, bio: $bio, course: $course, studyYear: $studyYear, isSmoker: $isSmoker, socialScore: $socialScore, minPrice: $minPrice, maxPrice: $maxPrice, genderPreference: $genderPreference) {
            facebookUserId
        }
    }
`;