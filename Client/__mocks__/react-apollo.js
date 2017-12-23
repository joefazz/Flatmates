// __mocks__/react-apollo.js
import React from 'react';

const actualReactApollo = require.requireActual('react-apollo');

let mockProps = {};

const setMockGraphQLProps = (props) => { mockProps = props; };
const graphql = () => Component => props => <Component {...mockProps} {...props} />;

const { compose, createBatchingNetworkInterface, ApolloClient } = actualReactApollo;

export {
  graphql,
  compose,
  setMockGraphQLProps,
  createBatchingNetworkInterface,
  ApolloClient
};