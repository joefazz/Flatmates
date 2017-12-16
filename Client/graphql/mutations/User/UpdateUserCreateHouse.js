import gql from 'graphql-tag';


export const UPDATE_USER_CREATE_HOUSE_MUTATION = gql`
    mutation updateUserCreateHouse($id: ID!, $bio: String!, $course: String!, $shortID: Int!, $road: String!, $rentPrice: Int!, $billsPrice: Int!, $spaces: Int!) {
        updateUser(id: $id, bio: $bio, course: $course, house: {shortID: $shortID, road: $road, rentPrice: $rentPrice, billsPrice: $billsPrice, spaces: $spaces}) {
            id
            house {
                id
            }
        }
    }
`;