import gql from 'graphql-tag';

import { HOUSE_FRAGMENT } from '../../Fragments';

export const HOUSE_DETAILS_QUERY = gql`
    query house($shortID: Int!) {
        house(shortID: $shortID) {
            road
            billsPrice
            rentPrice
            spaces
            houseImages
        }
    }
`;