import gql from 'graphql-tag';

import { HOUSE_FRAGMENT } from '../../Fragments';

export const CREATE_HOUSE_MUTATION = gql`
    mutation createHouse($road: String!, $posts: [Posts!]!, $price: Int!, $users: [Users!]!) {
        createHouse(road: $road, posts: $posts, price: $price, users: $users) {
            ... HouseFragment
        }
    }
    ${HOUSE_FRAGMENT}
`;