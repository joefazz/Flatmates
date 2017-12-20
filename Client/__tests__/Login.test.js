import 'react-native';
import React from 'react';
import { WebSocketLink } from 'apollo-link-ws';
jest.mock("Dimensions")
import { Login } from '../containers/Login';

import renderer from 'react-test-renderer';

test('Renders Login Correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});