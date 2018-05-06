import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_LOGIN_QUERY = gql`
    query UserLogin($email: String!) {
        user(email: $email) {
            id
            email
            authId
            firstName
            lastName
            name
            age
            bio
            gender
            course
            studyYear
            email_verified
            profilePicture
            isDrinker
            isDruggie
            isSmoker
            maxPrice
            minPrice
            genderPreference
            playerId
            house {
                shortID
            }
        }
    }
`;
