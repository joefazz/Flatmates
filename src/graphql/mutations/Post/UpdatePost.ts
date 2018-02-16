import gql from 'graphql-tag';

export const UPDATE_POST_MUTATION = gql`
    mutation UpdatePost($id: ID!, $lastSeen: DateTime!) {
        updatePost(id: $id, lastSeen: $lastSeen) {
            id
            description
            createdBy {
                coords
                road
                billsPrice
                rentPrice
                spaces
                houseImages
                users {
                    name
                    studyYear
                    imageUrl
                    course
                }
            }
        }
    }
`;