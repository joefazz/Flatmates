import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_DETAILS_QUERY = gql`
    query User($facebookUserId: String!) {
        User(facebookUserId: $facebookUserId) {
            course
            bio
            yearOfStudy
            genderPreference
            smokingPreference
            studyYearPreference
            maxPrice
            minPrice
            house {
                shortID
                road
            }
        }
    }
`;
