import gql from 'graphql-tag';

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription MessageAdded($groupID: ID!, $userID: ID!) {
        message(groupID: $groupID, userID: $userID) {
            node {
                id
                createdAt
                text
                images
                to {
                    id
                }
                from {
                    id
                    name
                    profilePicture
                    house {
                        shortID
                    }
                }
            }
        }
    }
`;
