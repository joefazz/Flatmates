import gql from 'graphql-tag';

export const COMPLETE_APPLICATION_MUTATION = gql`
    mutation CompleteApplication($applicantID: ID!, $houseID: Int!, $houseName: String!, $applicantName: String!) {
        completeApplication(applicantID: $applicantID, houseID: $houseID, houseName: $houseName, applicantName: $applicantName) {
            shortID
            road
            groups {
                id
                messages(last: 1) {
                    id
                    text
                }
                applicant {
                    id
                }
            }
            houseImages
            applications {
                id
            }
        }
    }
`