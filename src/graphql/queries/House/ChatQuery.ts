import gql from 'graphql-tag';

export const HOUSE_CHAT_QUERY = gql`
    query HouseChat($shortID: Int!) {
        house(shortID: $shortID) {
            shortID
            groups {
                id
                name
                applicant {
                    id
                    name
                    profilePicture
                    playerId
                }
            }
        }
    }
`;
