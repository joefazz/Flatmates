import 'react-native';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
jest.mock("Dimensions")
jest.mock("react-apollo")
jest.mock("apollo-link-ws")
import { Login } from '../containers/Login';

import renderer from 'react-test-renderer';

describe('Login', () => 
    test('Renders component correctly', () => {
        const wrapper = shallow(<Login />);

        expect(toJSON(wrapper)).toMatchSnapshot();
    })
)