import gql from 'graphql-tag';

export const POST_DETAILS_QUERY = gql`
    query Post($id: ID!) {
        Post(id: $id) {
            title
            description
            imageUrl
            createdAt
            createdBy {
                road
                billsPrice
                rentPrice
                spaces
            }
        }
    }
`;