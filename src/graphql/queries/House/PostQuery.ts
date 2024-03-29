import gql from 'graphql-tag';

export const HOUSE_POST_QUERY = gql`
    query HousePost($shortID: Int!) {
        house(shortID: $shortID) {
            shortID
            road
            billsPrice
            rentPrice
            spaces
            houseImages
            applicationCount
            post {
                __typename
                id
                description
                lastSeen
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
