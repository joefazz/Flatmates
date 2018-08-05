import gql from 'graphql-tag';

export const CREATE_GROUP_MUTATION = gql`
    mutation CreateGroup(
        $approverName: String!
        $applicantName: String!
        $houseID: Int!
        $applicantID: ID!
        $roadName: String!
    ) {
        createGroup(
            applicantID: $applicantID
            applicantName: $applicantName
            houseID: $houseID
            approverName: $approverName
            roadName: $roadName
        ) {
            id
            applicant {
                id
                name
                profilePicture
            }
            house {
                shortID
                road
                houseImages
                users {
                    id
                    profilePicture
                    name
                }
            }
            messages(last: 1) {
                id
                text
            }
        }
    }
`;
