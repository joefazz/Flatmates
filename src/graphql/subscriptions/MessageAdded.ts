import gql from 'graphql-tag';

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription messageAdded($groupID: ID!) {
        messageAdded(groupID: $groupID) {
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
`