import operation from './operation'
import Big from 'big.js';

export default function calculate(prevState, buttonName) {
	let expression = prevState.expression;
	let lastIdx = prevState.lastIdx;
	let display = prevState.display;

	if (buttonName === "AC") {

		return { expression: ["0", "", "", "", "", ""], lastIdx: 0, display: "0" };
	}

	if (buttonName === "C") {

		return clear(expression, lastIdx);
	}

	if (buttonName === "+" || buttonName === "-" || 
		buttonName === "*" || buttonName === "/") {

		return operate(expression, lastIdx, display, buttonName);
	}

	if (buttonName === "=") {

		return evaluate(expression, lastIdx, display); 
	}

	if (buttonName === "%") {

		return percent(expression, lastIdx, display);
	}

	if (buttonName === "+/-") {
		
		return negate(expression, lastIdx, display);
	}

	return addOperand(expression, lastIdx, display, buttonName);
}

function clear(expression, lastIdx) {
	if (atOperandPosition(lastIdx)) {

		expression[lastIdx] = "0";

		return { expression, lastIdx, display: "0" };

	} else if (isEmpty(expression[lastIdx])) {

		expression[--lastIdx] = "0";

		return { expression, lastIdx, display: "0" };
	}

	return null;
}

function atOperandPosition(idx) {
	return (idx % 2 === 0);
}

function isEmpty(str) {
	return (str.length === 0);
}

function operate(expression, lastIdx, display, buttonName) {
	if (atOperatorPosition(lastIdx)) {

		if (expression[0] === "Error")
			return clear(expression, lastIdx);
		// Changing operators
		expression[lastIdx] = buttonName;
	} else {
		// Add operator
		expression[++lastIdx] = buttonName;
	}
	
	if (enoughInputs(lastIdx)) {
		[ expression, lastIdx, display ] = operation(expression, lastIdx);
	}

	return { expression, lastIdx, display };
}

function atOperatorPosition(idx) {
	return (idx % 2 !== 0);
}

function enoughInputs(idx) {
	return (idx >= 3);
}

function evaluate(expression, lastIdx, display) {
	if (atOperatorPosition(lastIdx)) {
		expression[lastIdx--] = "";
	}

	expression[++lastIdx] = "=";
	[ expression, lastIdx, display ] = operation(expression, lastIdx);
	
	return { expression, lastIdx, display };
}

function percent(expression, lastIdx, display) {
	// If an operator hasn't yet entered
	if (atOperatorPosition(lastIdx) && isEmpty(expression[lastIdx])) {
		lastIdx--;
	}

	if (atOperandPosition(lastIdx) && isNotEmpty(expression[lastIdx])) {
		expression[lastIdx] = Big(expression[lastIdx]).div(100).toString();

		return { expression, lastIdx: lastIdx + 1, display: expression[lastIdx] };
	}

	return null;
}

function isNotEmpty(str) {
	return (str.length);
}

function negate(expression, lastIdx, display) {
	if (atOperatorPosition(lastIdx)) {
		if (isEmpty(expression[lastIdx]))
			lastIdx--;
		else
			lastIdx++;
	}

	if (isEmpty(expression[lastIdx])) {
		expression[lastIdx] = "-0";
	} else {
		expression[lastIdx] = (parseFloat(expression[lastIdx])* -1).toString();
	}

	return { expression, lastIdx, display: expression[lastIdx] };
}

function addOperand(expression, lastIdx, display, buttonName) {
	if (buttonName === '.' && expression[lastIdx].includes("."))
		return null;

	if (atOperandPosition(lastIdx)) {
		if (buttonName === '.' || (expression[lastIdx] !== "0" && expression[lastIdx] !== "-0"))

			expression[lastIdx] += buttonName;

		else if (expression[lastIdx] === "0")

			expression[lastIdx] = buttonName;

		else

			expression[lastIdx] = "-" + buttonName;

		display = expression[lastIdx];

	} else if (isNotEmpty(expression[lastIdx])) {
		// Start a new operand
		expression[++lastIdx] = buttonName;
		display = expression[lastIdx];

	} else {
		// Start a new calculation
		expression = [ buttonName, "", "", "", "", "" ];
		lastIdx = 0;
		display = expression[0];
	}
	
	return { expression, display, lastIdx };
}