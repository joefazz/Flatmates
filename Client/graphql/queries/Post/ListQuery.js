import gql from 'graphql-tag';

export const POST_LIST_QUERY = gql`
    query allPosts($take: Int!, $skip: Int!) {
        allPosts(take: $take, skip: $skip) {
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