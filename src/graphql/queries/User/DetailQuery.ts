import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_DETAILS_QUERY = gql`
    query UserDetail($id: ID!) {
        user(id: $id) {
            name
            course
            bio
            studyYear
            isSmoker
            genderPreference
            maxPrice
            minPrice
            house {
                shortID
                road
                billsPrice
                rentPrice
                spaces
                users(where: { id_not: $id }) {
                    name
                }
                houseImages
            }
        }
    }
`;
