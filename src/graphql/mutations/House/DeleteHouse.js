import gql from 'graphql-tag';


export const CREATE_HOUSE_MUTATION = gql`
    mutation deleteHouse($shortID: Int) {
        deleteHouse(shortID: $shortID) {
            shortID
        }
    }
`;