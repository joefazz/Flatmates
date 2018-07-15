import gql from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($id: ID!, $name: String, $firstName: String, $lastName: String, $age: Int, $course: String, $bio: String, $studyYear: String, $gender: String, $isSmoker: Boolean, $isDruggie: Boolean, $isDrinker: Boolean) {
        updateUser(id: $id, name: $name, firstName: $firstName, lastName: $lastName, age: $age, course: $course, bio: $bio, studyYear: $studyYear, gender: $gender, isSmoker: $isSmoker, isDruggie: $isDruggie, isDrinker: $isDrinker) {
            id
            name
            firstName
            lastName
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