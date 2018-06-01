import gql from 'graphql-tag';

export const CREATE_APPLICATION_MUTATION = gql`
    mutation CreateApplication(
        $userID: ID!
        $houseID: Int!
        $playerIDs: [ID!]!
        $from: String!
        $message: String
    ) {
        createApplication(
            userID: $userID
            houseID: $houseID
            playerIDs: $playerIDs
            from: $from
            message: $message
        ) {
            id
            to {
                shortID
                houseImages
                road
                billsPrice
                rentPrice
                post {
                    id
                    description
                }
            }
            createdAt
        }
    }
`;
