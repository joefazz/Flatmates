import gql from 'graphql-tag';

export const UPDATE_HOUSE_MUTATION = gql`
    mutation updateHouse($id: Int!, $road: String!) {
        updateHouse(id: $id, road: $road) {
            id
            road
        }
    }
`;