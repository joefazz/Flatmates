import gql from 'graphql-tag';


export const CREATE_HOUSE_MUTATION = gql`
    mutation deleteHouse($id: Int!) {
        deleteHouse(id: $id) {
            id
        }
    }
`;