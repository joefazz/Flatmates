import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
        $name: String!
        $email: String!
        $authId: String!
        $email_verified: Boolean!
        $firstName: String!
        $lastName: String!
        $age: Int
        $gender: String
        $profilePicture: String
        $course: String
        $studyYear: String
        $isSmoker: Boolean!
        $isDrinker: Boolean!
        $bio: String!
        $maxPrice: Int
        $minPrice: Int
        $genderPreference: String
        $drinkPreference: String
        $smokerPreference: String
    ) {
        createUser(
            name: $name
            email: $email
            authId: $authId
            email_verified: $email_verified
            firstName: $firstName
            lastName: $lastName
            age: $age
            gender: $gender
            profilePicture: $profilePicture
            course: $course
            studyYear: $studyYear
            isSmoker: $isSmoker
            isDrinker: $isDrinker
            bio: $bio
            maxPrice: $maxPrice
            minPrice: $minPrice
            genderPreference: $genderPreference
            drinkPreference: $drinkPreference
            smokerPreference: $smokerPreference
        ) {
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
            isSmoker
            maxPrice
            minPrice
            genderPreference
            house {
                shortID
                road
                billsPrice
                rentPrice
                spaces
            }
        }
    }
`;
