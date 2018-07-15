import gql from 'graphql-tag';

export const UPDATE_HOUSE_MUTATION = gql`
    mutation UpdateHouse($shortID: Int!, $road: String, $coords: [Float!], $spaces: Int, $rentDue: String, $billsDue: String, $rentPrice: Int, $billsPrice: Int) {
        updateHouse(shortID: $shortID, road: $road, coords: $coords, spaces: $spaces, rentDue: $rentDue, billsDue: $billsDue, rentPrice: $rentPrice, billsPrice: $billsPrice) {
            shortID
            road
            coords
            spaces
            rentDue
            billsDue
            rentPrice
            billsPrice
        }
    }
`;