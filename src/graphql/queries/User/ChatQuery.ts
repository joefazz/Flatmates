import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_CHAT_QUERY = gql`
    query UserChat($id: ID!) {
        user(id: $id) {
            id
            groups {
                id
                name
                applicant {
                    id
                    name
                    profilePicture
                    playerId
                }
                house {
                    shortID
                    houseImages
                    users {
                        id
                        playerId
                        profilePicture
                        name
                    }
                }
            }
        }
    }
`;
