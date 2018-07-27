import gql from 'graphql-tag';

export const VERIFY_EMAIL_MUTATION = gql`
    mutation VerifyEmail($id: ID!, $email_verified: Boolean!) {
        verifyEmail(id: $id, email_verified: $email_verified) {
            id
            email_verified
        }
    }

`