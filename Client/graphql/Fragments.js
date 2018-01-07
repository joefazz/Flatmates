import gql from 'graphql-tag';

export const MESSAGE_FRAGMENT = gql`
    fragment MessageFragment on Message {
        id
        to {
            id
            road
        }
        createdBy {
            id
            email
        }
        createdAt
        text
    }
`;

export const POST_FRAGMENT = gql`
fragment PostFragment on Post {
    id
    title
    description
    createdBy {
        id
        road
        users {
            id
            email
        }
    }
}`

export const HOUSE_FRAGMENT = gql`
fragment HouseFragment on House {
    id
    road
    billsPrice
    rentPrice
    users {
        name
    }
    posts {
        title
        description
    }
}`

export const USER_FRAGMENT = gql`
fragment UserFragment on User {
    id
    email
    facebookUserId
}`