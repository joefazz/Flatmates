import gql from 'graphql-tag';

// Get the user and all user's groups
export const USER_CHAT_QUERY = gql`
    query UserChat($id: ID!) {
        user(id: $id) {
            id
            groups {
                id
                applicant {
                    id
                    name
                    profilePicture
                }
                house {
                    shortID
                    houseImages
                    road
                    users {
                        id
                        profilePicture
                        name
                    }
                }
                messages(first: 1) {
                    id
                    text
                }
            }
        }
    }
`;
