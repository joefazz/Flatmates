import gql from 'graphql-tag';


export const UPDATE_USER_CREATE_HOUSE_MUTATION = gql`
    mutation updateUserCreateHouse($facebookUserId: String!, $bio: String!, $course: String!, $studyYear: String!, $isSmoker: Boolean!, $socialScore: Int!, $shortID: Int!, $road: String!, $rentPrice: Int!, $billsPrice: Int!, $spaces: Int!, $houseImages: [String!]!) {
        updateUserCreateHouse(facebookUserId: $facebookUserId, bio: $bio, course: $course, studyYear: $studyYear, isSmoker: $isSmoker, socialScore: $socialScore, shortID: $shortID, road: $road, rentPrice: $rentPrice, billsPrice: $billsPrice, spaces: $spaces, houseImages: $houseImages) {
            facebookUserId
            house {
                shortID
            }
        }
    }
`;