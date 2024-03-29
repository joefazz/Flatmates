import gql from 'graphql-tag';

export const CREATE_APPLICATION_MUTATION = gql`
    mutation CreateApplication($userID: ID!, $houseID: Int!, $from: String!, $message: String) {
        createApplication(userID: $userID, houseID: $houseID, from: $from, message: $message) {
            id
            isActive
            from {
                id
                name
                firstName
                lastName
                course
                age
                bio
                studyYear
                profilePicture
                gender
                isSmoker
                isDrinker
                minPrice
                maxPrice
                genderPreference
                house {
                    shortID
                }
            }
            to {
                shortID
                houseImages
                road
                coords
                spaces
                billsPrice
                rentPrice
                post {
                    id
                    description
                }
                users {
                    id
                    name
                    profilePicture
                    course
                    studyYear
                }
            }
            createdAt
        }
    }
`;
