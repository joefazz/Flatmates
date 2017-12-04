import gql from 'graphql-tag';

export const CREATE_GROUP = `gql
    mutation createGroup($name: String!, $userIds: [Int!]!) {
        createGroup(name: $name, userIds: $userIds) {
            id
            createdAt
            name
            user {
                name
            }
        }
    }
`;