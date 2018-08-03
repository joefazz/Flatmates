import gql from 'graphql-tag';

export const LEAVE_HOUSE_MUTATION = gql`
    mutation LeaveHouse($id: ID!, $name: String!, $houseID: Int!) {
        leaveHouse(id: $id, name: $name, houseID: $houseID) {
            id
            name
            house {
                road
            }
        }
    }
`