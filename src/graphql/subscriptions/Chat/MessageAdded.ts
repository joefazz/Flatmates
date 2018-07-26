import gql from 'graphql-tag';

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription MessageAdded($groupID: ID!) {
        message(groupID: $groupID) {
            node {
                id
                text
                images
                to {
                    id
                }
                from {
                    id
                    name
                    profilePicture
                }
                createdAt
            }
        }
    }   
`