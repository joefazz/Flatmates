import gql from 'graphql-tag';

export const POST_LIST_QUERY = gql`
    query allPosts {
        allPosts {
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