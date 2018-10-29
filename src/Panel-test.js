import React from 'react';
import Panel from '../Panel';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

it('renders correctly', () => {
	const mockCallBack = jest.fn();

	const panel = shallow((<Panel clickHandler={mockCallBack} />));
	panel.find('#AC').simulate('click');
	expect(mockCallBack.mock.calls.length).toEqual(1);
	//const tree = renderer.create(<Panel clickHandler={mockCallBack} />).toJSON();
	//expect(tree).toMatchSnapshot();
});