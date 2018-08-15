import { ApolloClient, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ReduxLink } from 'apollo-link-redux';
import { ReduxCache } from 'apollo-cache-redux';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import store from './redux/store';
import { DOMAIN } from './consts/endpoint';

const wsLink = new WebSocketLink({
    uri: 'wss://flatmates-prisma.now.sh',
    // uri: 'ws://localhost:4000',
    options: {
        reconnect: true
    }
});

export const AUTH_HEADER =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJmbGF0bWF0ZXMtcHJpc21hQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1MzMxNTcyMTUsImV4cCI6MTUzMzc2MjAxNX0.vwaFpyQtZG3wyVXadHlalV8MrHJ0HFF4c1nmZH-ffmg';

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    return {
        headers: {
            ...headers,
            Authorization: AUTH_HEADER
        }
    };
});

const cache = new ReduxCache({ store });

const reduxLink = new ReduxLink(store);

const errorLink = onError((errors) => {
    console.log(errors);
});

const httpLink = createHttpLink({
    uri: DOMAIN
});

const splitLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
);

const link = ApolloLink.from([reduxLink, errorLink, splitLink]);

const client = new ApolloClient({
    link,
    cache
});

export default client;
