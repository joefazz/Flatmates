import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost($description: String!, $createdBy: Int!) {
        createPost(description: $description, createdBy: $createdBy) {
            __typename
            id
            description
            createdAt
            lastSeen
            viewCount
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