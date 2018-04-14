import gql from 'graphql-tag';

export const CREATE_USER_UPDATE_HOUSE_MUTATION = gql`
    mutation CreateUserUpdateHouse(
        $name: String!
        $email: String!
        $authId: String!
        $playerId: String
        $email_verified: Boolean!
        $firstName: String!
        $lastName: String!
        $age: Int!
        $gender: String!
        $profilePicture: String!
        $course: String!
        $studyYear: String!
        $isSmoker: Boolean!
        $isDruggie: Boolean!
        $isDrinker: Boolean!
        $bio: String!
        $houseId: Int!
    ) {
        createUserUpdateHouse(
            name: $name
            email: $email
            authId: $authId
            playerId: $playerId
            email_verified: $email_verified
            firstName: $firstName
            lastName: $lastName
            age: $age
            gender: $gender
            profilePicture: $profilePicture
            course: $course
            studyYear: $studyYear
            isSmoker: $isSmoker
            isDruggie: $isDruggie
            isDrinker: $isDrinker
            bio: $bio
            houseId: $houseId
        ) {
            id
            house {
                shortID
            }
        }
    }
`;
