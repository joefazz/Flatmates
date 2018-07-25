import gql from 'graphql-tag';

export const USER_HOUSE_POST_QUERY = gql`
    query HousePost($id: ID!) {
        user(id: $id) {
            id
            house {
                shortID
                post {
                    id
                    description
                    lastSeen
                }
            }
        }
    }
`;
