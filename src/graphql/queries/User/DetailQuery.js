import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_DETAILS_QUERY = gql`
    query user($facebookUserId: String!) {
        user(facebookUserId: $facebookUserId) {
            course
            bio
            studyYear
            isSmoker
            socialScore
            genderPreference
            maxPrice
            minPrice
            house {
                shortID
                road
                billsPrice
                rentPrice
                spaces
                users {
                    name
                }
            }
        }
    }
`;