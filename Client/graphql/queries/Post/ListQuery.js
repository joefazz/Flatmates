import gql from 'graphql-tag';

export const POST_LIST_QUERY = gql`
    query allPosts {
        allPosts {
            id
            title
            description
            createdAt
            createdBy {
                road
                billsPrice
                rentPrice
                spaces
                houseImages
            }
        }
    }
`;