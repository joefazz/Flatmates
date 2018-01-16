import gql from 'graphql-tag';

export const POST_DETAILS_QUERY = gql`
    query Post($id: ID!) {
        Post(id: $id) {
            id
            title
            description
            createdAt
            createdBy {
                road
                billsPrice
                rentPrice
                spaces
                houseImages
                users {
                    id
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