// __mocks__/react-apollo.js
import React from 'react';

const actualApolloLinkWS = require.requireActual('apollo-link-ws');

const { WebSocketLink } = actualApolloLinkWS;

export {
  WebSocketLink
};