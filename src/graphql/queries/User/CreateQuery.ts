import gql from 'graphql-tag';

export const USER_POST_QUERY = gql`
    query UserPost($id: ID!) {
        user(id: $id) {
            id
            house {
                shortID
                spaces
                road
                coords
                billsPrice
                rentPrice
                houseImages
            }
        }
    }
`;
