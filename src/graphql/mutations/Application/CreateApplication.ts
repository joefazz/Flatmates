import gql from 'graphql-tag';

export const CREATE_APPLICATION_MUTATION = gql`
    mutation CreateApplication($fromUser: ID!, $toHouse: Int!, $message: String) {
        createApplication(from: $fromUser, to: $toHouse, message: $message) {
            id
        }
    }
`;
