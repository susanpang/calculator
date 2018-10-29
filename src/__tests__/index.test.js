import React from 'react';
import App from '../index';
import { mount } from 'enzyme';

function click(wrapper, buttons) {
	for (let i = 0; i < buttons.length; i++) {
		wrapper.find(buttons[i]).simulate('click');
	}
}

it('1.23 + 456.7890 =', () => {
	const rootNode = mount(<App />);
	const expression = ['#one', '#dot', '#two', '#three', '#plus', 
		'#four', '#five', '#six', '#dot', '#seven', '#eight', '#nine', '#zero', '#equal'];
	
	click(rootNode, expression);

	expect(rootNode.state('display')).toEqual("458.019");
});

it('Test 1.23 AC', () => {
	const rootNode = mount(<App />);
	const expression = ['#one', '#dot', '#two', '#three', '#plus'];
	
	click(rootNode, expression);

	expect(rootNode.state('display')).toEqual("1.23");

	click(rootNode, ['#AC']);

	expect(rootNode.state('display')).toEqual("0");
});

it('Test 1.23 - 6 C 7 =', () => {
	const rootNode = mount(<App />);
	const expression = ['#one', '#dot', '#two', '#three', '#minus', '#six', '#C', '#seven', '#equal'];
	
	click(rootNode, expression);

	expect(rootNode.state('display')).toEqual("-5.77");
})

it('Test 123 % * 5 =', () => {
	const rootNode = mount(<App />);
	const expression = ['#one', '#two', '#three', '#percent', '#times', '#five', '#equal'];
	
	click(rootNode, expression);

	expect(rootNode.state('display')).toEqual("6.15");
});

it('Test -123 / 7 =', () => {
	const rootNode = mount(<App />);
	const expression = ['#one', '#two', '#three', '#negate', '#divide', '#seven', '#equal'];
	
	click(rootNode, expression);

	expect(rootNode.state('display')).toEqual("-1.75714285714286e+1");
});

it('Test 987654321 * 987654321 =', () => {
	const rootNode = mount(<App />);
	const number = ['#nine', '#eight', '#seven', '#six', '#five', '#four', '#three', '#two', '#one'];
	
	click(rootNode, number);
	click(rootNode, ['#times']);
	click(rootNode, number);
	click(rootNode, ['#equal']);

	expect(rootNode.state('display')).toEqual("9.75461057789971e+17");
});