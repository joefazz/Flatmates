import gql from 'graphql-tag';

export const UNSTAR_POST_MUTATION = gql`
    mutation UnstarPost($id: ID!, $postID: ID!) {
        unstarPost(id: $id, postID: $postID) {
            id
        }
    }
`;
