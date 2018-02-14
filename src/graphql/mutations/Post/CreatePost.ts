import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
    mutation createPost($title: String!, $description: String!, $createdBy: Int!) {
        createPost(title: $title, description: $description, createdBy: $createdBy) {
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