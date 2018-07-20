import gql from 'graphql-tag';

export const USER_APPLICATIONS_QUERY = gql`
    query UserApplications($id: ID!) {
        user(id: $id) {
            id
            applicationAllowance
            applications {
                id
                to {
                    shortID
                    houseImages
                    road
                    coords
                    spaces
                    billsPrice
                    rentPrice
                    post {
                        id
                        description
                    }
                    users {
                        id
                        name
                        profilePicture
                        course
                        studyYear
                    }
                }
                createdAt
            }
        }
    }
`;
