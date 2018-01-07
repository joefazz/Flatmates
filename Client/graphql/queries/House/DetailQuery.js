import gql from 'graphql-tag';

import { HOUSE_FRAGMENT } from '../../Fragments';

export const HOUSE_DETAILS_QUERY = gql`
    query House($shortID: Int!) {
        House(shortID: $shortID) {
            ... HouseFragment
        }
    }
    ${HOUSE_FRAGMENT}
`;