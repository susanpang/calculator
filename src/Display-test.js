import React from 'react';
import renderer from 'react-test-renderer';
import Display from '../Display';

it('renders correctly', () => {
	const tree = renderer.create(<Display value={"0"} />).toJSON();
	expect(tree).toMatchSnapshot();
});