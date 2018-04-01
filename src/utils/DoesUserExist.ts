import client from '../Client';
import { USER_LOGIN_QUERY } from '../graphql/queries';
import { UserLoginQuery } from '../graphql/Types';
import { ApolloQueryResult } from 'apollo-client';

export async function doesUserExist(identityToken: string) {
    const { data: { user } } = await client.query<UserLoginQuery>({ query: USER_LOGIN_QUERY, variables: { email: "joseph@fazzino.net' } });
}