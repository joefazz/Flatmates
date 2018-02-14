import gql from 'graphql-tag';

export const POST_DETAILS_QUERY = gql`
    query post($id: ID!) {
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
                    name
                    gender
                    bio
                    studyYear
                    isSmoker
                    imageUrl
                    course
                    birthday
                }
            }
        }
    }
`;