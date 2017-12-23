import gql from 'graphql-tag';

import {USER_FRAGMENT} from '../../Fragments';

// Get the user and all user's groups
export const USER_LOGIN_QUERY = gql`
    query User($facebookUserId: String!) {
        User(facebookUserId: $facebookUserId) {
            ... UserFragment
        }
    }
    ${USER_FRAGMENT}
`;
