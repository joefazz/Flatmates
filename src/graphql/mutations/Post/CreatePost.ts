import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost($description: String!, $createdBy: Int!) {
        createPost(description: $description, createdBy: $createdBy) {
            id
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