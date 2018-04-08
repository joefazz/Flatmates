import gql from 'graphql-tag';

export const HOUSE_APPLICATIONS_QUERY = gql`
    query HouseApplications($shortID: Int!) {
        house(shortID: $shortID) {
            applications {
                id
                from {
                    id
                    name
                    course
                    age
                    studyYear
                    profilePicture
                }
                createdAt
            }
        }
    }
`;
