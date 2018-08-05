import gql from 'graphql-tag';

export const HOUSE_POST_QUERY = gql`
    query HousePost($shortID: Int!) {
        house(shortID: $shortID) {
                shortID
                spaces
                post {
                    id
                    description
                    lastSeen
                }
        }
    }
`;
