import gql from 'graphql-tag';

export const DELETE_POST_MUTATION = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`