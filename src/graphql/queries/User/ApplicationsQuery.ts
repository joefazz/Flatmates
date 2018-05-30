import gql from 'graphql-tag';

export const USER_APPLICATIONS_QUERY = gql`
    query UserApplications($id: ID!) {
        user(id: $id) {
            id
            applications {
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
    }
`;
