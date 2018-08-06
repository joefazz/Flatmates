import gql from 'graphql-tag';

export const HOUSE_CHAT_QUERY = gql`
    query HouseChat($shortID: Int!) {
        house(shortID: $shortID) {
            shortID
            groups(orderBy: updatedAt_DESC) {
                id
                applicant {
                    id
                    name
                    profilePicture
                    house {
                        shortID
                    }
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
                messages(last: 1) {
                    id
                    createdAt
                    text
                    images
                    to {
                        id
                    }
                    from {
                        id
                        name
                        profilePicture
                        house {
                            shortID
                        }
                    }
                }
            }
        }
    }
`;
