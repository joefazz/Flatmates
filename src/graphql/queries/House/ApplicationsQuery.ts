import gql from 'graphql-tag';

export const HOUSE_APPLICATIONS_QUERY = gql`
    query HouseApplications($shortID: Int!) {
        house(shortID: $shortID) {
            applications {
                id
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
                    isDruggie
                    isDrinker
                    minPrice
                    maxPrice
                    genderPreference
                }
                to {
                    users {
                        id
                    }
                }
                createdAt
            }
        }
    }
`;
