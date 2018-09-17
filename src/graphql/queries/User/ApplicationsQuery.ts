import gql from 'graphql-tag';

export const USER_APPLICATIONS_QUERY = gql`
    query UserApplications($id: ID!) {
        user(id: $id) {
            id
            applications {
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
    }
`;
