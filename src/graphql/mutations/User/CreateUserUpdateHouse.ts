import gql from 'graphql-tag';

export const CREATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation CreateUserUpdateHouse(
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
        $houseId: Int!
    ) {
        createUserUpdateHouse(
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
            houseId: $houseId
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
