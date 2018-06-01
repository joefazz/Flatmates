import gql from 'graphql-tag';

export const CREATE_GROUP_MUTATION = gql`
    mutation CreateGroup(
        $playerID: String
        $approverName: String!
        $applicantName: String!
        $houseID: Int!
        $applicantID: ID!
        $roadName: String!
        $housePlayerIDs: [String!]!
    ) {
        createGroup(
            playerID: $playerID
            applicantID: $applicantID
            applicantName: $applicantName
            houseID: $houseID
            approverName: $approverName
            roadName: $roadName
            housePlayerIDs: $housePlayerIDs
        ) {
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
`;
