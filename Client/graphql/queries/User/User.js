import gql from 'graphql-tag';

import {USER_FRAGMENT} from '../Fragments';

// Get the user and all user's groups
export const USER_QUERY = gql`
    query user($id: Int) {
        user(id: $id) {
            ... UserFragment
        }
    }
    ${USER_FRAGMENT}
`;
