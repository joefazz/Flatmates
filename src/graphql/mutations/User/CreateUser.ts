import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
        $name: String!
        $firstName: String!
        $lastName: String!
        $imageUrl: String!
        $gender: String!
        $birthday: String!
        $isSmoker: Boolean!
        $idToken: String!
        $bio: String!
        $course: String!
        $studyYear: String!
    ) {
        createUser(
            name: $name
            firstName: $firstName
            lastName: $lastName
            imageUrl: $imageUrl
            birthday: $birthday
            gender: $gender
            isSmoker: $isSmoker
            idToken: $idToken
            bio: $bio
            course: $course
            studyYear: $studyYear
        ) {
            name
        }
    }
`;
