import gql from 'graphql-tag';

export const UPDATE_USER_PLAYER_ID = gql`
    mutation UserPlayerID($id: ID!, $playerID: String!) {
        updateUserPlayerID(id: $id, playerID: $playerID) {
            id
            playerId
        }
    }
`;
