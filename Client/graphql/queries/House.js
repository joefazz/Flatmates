import gql from 'graphql-tag';

import { HOUSE_FRAGMENT } from '../Fragments';

export const HOUSE_QUERY = gql`
    query house($houseId: Int!) {
        house(id: $houseId) {
            ... HouseFragment
        }
    }
    ${HOUSE_FRAGMENT}
`;