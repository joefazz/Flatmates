import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

// const wsLink = new WebSocketLink({
//     uri: 'http://localhost:4000',
//     options: {
//         reconnect: true
//     }
// });

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

// const link = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     httpLink,
// );

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;