import gql from 'graphql-tag';


export const LEAVE_HOUSE_MUTATION = gql`
mutation leaveHouse($id: Int!, $userId: Int!) {
        leaveHouse(id: $id, userId: $userId) {
            id
        }
    }
`;