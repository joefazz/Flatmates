import gql from 'graphql-tag';

export const HOUSE_DETAILS_QUERY = gql`
    query HouseDetail($shortID: Int!) {
        house(shortID: $shortID) {
            shortID
            road
            billsPrice
            rentPrice
            spaces
            houseImages
            applicationCount
            post {
                id
                viewCount
            }
            users {
                id
                name
                profilePicture
            }
        }
    }
`;