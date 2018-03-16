import gql from "graphql-tag";

export const POST_LIST_QUERY = gql`
    query AllPosts($take: Int!, $skip: Int) {
        allPosts(take: $take, skip: $skip) {
            id
            description
            createdAt
            lastSeen
            createdBy {
                shortID
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
