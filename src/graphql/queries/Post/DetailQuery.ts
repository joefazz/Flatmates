import gql from 'graphql-tag';

export const POST_DETAILS_QUERY = gql`
    query PostDetail($id: ID!) {
        post(id: $id) {
            id
            description
            createdAt
            createdBy {
                coords
                road
                billsPrice
                rentPrice
                spaces
                houseImages
                users {
                    id
                    name
                    gender
                    age
                    bio
                    studyYear
                    isSmoker
                    isDrinker
                    profilePicture
                    course
                    age
                }
            }
        }
    }
`;
