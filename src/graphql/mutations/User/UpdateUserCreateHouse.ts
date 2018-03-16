import gql from 'graphql-tag';

export const UPDATE_USER_CREATE_HOUSE_MUTATION = gql`
    mutation UpdateUserCreateHouse($facebookUserId: String!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $shortID: Int!, $road: String!, $coords: [Float!]! $rentPrice: Int!, $billsPrice: Int!, $spaces: Int!, $houseImages: [String!]!) {
        updateUserCreateHouse(facebookUserId: $facebookUserId, bio: $bio, course: $course, studyYear: $studyYear, isSmoker: $isSmoker, shortID: $shortID, road: $road, coords: $coords, rentPrice: $rentPrice, billsPrice: $billsPrice, spaces: $spaces, houseImages: $houseImages) {
            facebookUserId
            house {
                shortID
            }
        }
    }
`;