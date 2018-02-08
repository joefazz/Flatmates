import gql from 'graphql-tag';

export const createPostMutation = gql`
    mutation createPost($title: String!, $description: String!, $createdBy: Int!) {
        createPost(title: $title, description: $description, createdBy: $createdBy) {
            id
            title
            description
        }
    }
`;