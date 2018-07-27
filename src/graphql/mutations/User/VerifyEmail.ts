import gql from 'graphql-tag';

export const VERIFY_EMAIL_MUTATION = gql`
    mutation VerifyEmail($email: String!, $email_verified: Boolean!) {
        verifyEmail(email: $email, email_verified: $email_verified) {
            id
            email
            email_verified
        }
    }

`