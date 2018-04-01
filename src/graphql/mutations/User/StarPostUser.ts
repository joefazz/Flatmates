import gql from 'graphql-tag';

export const STAR_POST_MUTATION = gql`
    mutation StarPost($id: ID!, $postID: ID!) {
        starPost(id: $id, postID: $postID) {
            id
        }
    }
`;
