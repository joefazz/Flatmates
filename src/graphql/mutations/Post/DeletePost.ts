import gql from 'graphql-tag';



export const DELETE_POST_MUTATION = gql`
    deletePost($id: ID!) {
        mutation deletePost(id: $id) {
            id
        }
    }
`