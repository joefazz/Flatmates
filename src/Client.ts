import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

// const wsLink = new WebSocketLink({
//     uri: 'http://localhost:4000',
//     options: {
//         reconnect: true
//     }
// });

export const AUTH_HEADER =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJmbGF0bWF0ZXMtcHJpc21hQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1MjQwODEzMjAsImV4cCI6MTUyNDY4NjEyMH0.epbYq65hc53elb1wQdXSSxtJmUsMQ1jiMRaHLKDu5uY';

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    return {
        headers: {
            ...headers,
            authorization: AUTH_HEADER
        }
    };
});

const httpLink = new HttpLink({
    uri: 'https://flatmates-server.azurewebsites.net/'
});

// const link = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     httpLink,
// );

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
