import gql from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($id: ID!, $name: String, $firstName: String, $lastName: String, $profilePicture: String, $age: Int, $course: String, $bio: String, $studyYear: String, $gender: String, $isSmoker: Boolean, $isDruggie: Boolean, $isDrinker: Boolean) {
        updateUser(id: $id, name: $name, firstName: $firstName, lastName: $lastName, profilePicture: $profilePicture, age: $age, course: $course, bio: $bio, studyYear: $studyYear, gender: $gender, isSmoker: $isSmoker, isDruggie: $isDruggie, isDrinker: $isDrinker) {
            id
            name
            firstName
            lastName
            profilePicture
            age
            course
            bio
            studyYear
            gender
            isSmoker
            isDruggie
            isDrinker
        }
    }
`