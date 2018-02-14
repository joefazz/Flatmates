import gql from 'graphql-tag';

export const POST_LIST_QUERY = gql`
    query allPosts($take: Int!, $skip: Int!) {
        allPosts(take: $take, skip: $skip) {
            id
            description
            createdAt
            createdBy {
                road
                coords
                billsPrice
                rentPrice
                spaces
                houseImages
            }
        }
    }
`;