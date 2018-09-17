import gql from 'graphql-tag';

export const HOUSE_APPLICATIONS_QUERY = gql`
    query HouseApplications($shortID: Int!) {
        house(shortID: $shortID) {
            shortID
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
