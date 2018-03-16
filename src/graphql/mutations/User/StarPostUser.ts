import gql from 'graphql-tag';

export const STAR_POST_MUTATION = gql`
    mutation StarPost($facebookUserId: String!, $postID: ID!) {
        starPost(facebookUserId: $facebookUserId, postID: $postID) {
            facebookUserId
        }
    }
`