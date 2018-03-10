import gql from 'graphql-tag';

export const UPDATE_POST_MUTATION = gql`
    mutation UpdatePost($id: ID!, $lastSeen: DateTime!) {
        updatePost(id: $id, lastSeen: $lastSeen) {
            id
            description
            createdBy {
                shortID
                coords
                road
                billsPrice
                rentPrice
                spaces
                houseImages
                users {
                    facebookUserId
                    name
                    studyYear
                    birthday
                    gender
                    isSmoker
                    imageUrl
                    course
                }
            }
        }
    }
`;