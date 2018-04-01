import gql from 'graphql-tag';

export const CREATE_USER_CREATE_HOUSE_MUTATION = gql`
    mutation CreateUserCreateHouse(
        $email: String!
        $authId: String!
        $firstName: String!
        $lastName: String!
        $name: String!
        $age: Int!
        $bio: String!
        $gender: String!
        $course: String!
        $studyYear: String!
        $email_verified: Boolean!
        $profilePicture: String!
        $isDrinker: Boolean!
        $isDruggie: Boolean!
        $isSmoker: Boolean!
        $shortID: Int!
        $road: String!
        $coords: [Float!]!
        $rentPrice: Int!
        $billsPrice: Int!
        $spaces: Int!
        $houseImages: [String!]!
    ) {
        createUserCreateHouse(
            email: $email
            authId: $authId
            firstName: $firstName
            lastName: $lastName
            name: $name
            age: $age
            bio: $bio
            gender: $gender
            course: $course
            studyYear: $studyYear
            email_verified: $email_verified
            profilePicture: $profilePicture
            isDrinker: $isDrinker
            isDruggie: $isDruggie
            isSmoker: $isSmoker
            shortID: $shortID
            road: $road
            coords: $coords
            rentPrice: $rentPrice
            billsPrice: $billsPrice
            spaces: $spaces
            houseImages: $houseImages
        ) {
            id
            house {
                shortID
            }
        }
    }
`;
