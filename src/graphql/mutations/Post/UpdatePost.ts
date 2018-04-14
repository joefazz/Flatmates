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
                    id
                    name
                    playerId
                    studyYear
                    age
                    gender
                    isSmoker
                    isDruggie
                    isDrinker
                    profilePicture
                    course
                }
            }
        }
    }
`;
