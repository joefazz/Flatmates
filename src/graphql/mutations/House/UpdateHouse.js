import gql from 'graphql-tag';

export const UPDATE_HOUSE_MUTATION = gql`
    mutation updateHouse($shortID: Int!, $road: String!) {
        updateHouse(shortID: $shortID, road: $road) {
            shortID
            road
        }
    }
`;