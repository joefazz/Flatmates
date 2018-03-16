import gql from 'graphql-tag';

export const UNSTAR_POST_MUTATION = gql`
    mutation UnstarPost($facebookUserId: String!, $postID: ID!) {
        unstarPost(facebookUserId: $facebookUserId, postID: $postID) {
            facebookUserId
        }
    }
`