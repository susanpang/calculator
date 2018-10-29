import Big from 'big.js';

const MAX_LENGTH = 16;
const DESIRED_LENGTH = 14;

export default function operation(expression, lastIdx) {
	
	let display;

	if (inputsReachMax(expression)) {
		const fromIndex = 2;
		[ expression, lastIdx, display ] = doOperation(expression, fromIndex);
	}

	if (moreInputsNeeded(expression)) {

		lastIdx = 3;
		display = expression[2];

	} else if (expression[lastIdx] !== "=") {

		[ expression, lastIdx, display ] = doOperation(expression, 0);
	}

	if (expression[lastIdx] === "=") {

		if (lastOperationNeeded(lastIdx)) {
			[ expression, lastIdx, display ] = doOperation(expression, 0);
		}

		expression[1] = "";
		display = expression[0];
	}

	return [expression, lastIdx, display];
	
}

function inputsReachMax(expression) {
	return expression[5].length;
}

function doOperation(expression, from) {
	let op1 = Big(expression[from]);
	let op = expression[from+1];
	let op2 = Big(expression[from+2]);

	switch (op) {
		case '+':
			expression[from] = op1.plus(op2).toString();
			break;
		case '-':
			expression[from] = op1.minus(op2).toString();
			break;
		case '*':
			expression[from] = op1.times(op2).toString();
			break;
		default:
			if (op2.eq(Big(0))) return [ ["Error", "=", "", "", "", ""], 1, "" ];
			else expression[from] = op1.div(op2).toString();	
	}

	if (expression[from].length > MAX_LENGTH) {
		expression[from] = parseFloat(expression[from]).toExponential(DESIRED_LENGTH);
	}

	expression[from+1] = expression[from+3];
	expression[from+2] = "";
	expression[from+3] = "";

	return [ expression, from+1, expression[from] ];
}

function moreInputsNeeded(expression) {
	return ((expression[1] === '+' || expression[1] === '-') && 
		(expression[3] === '*' || expression[3] === '/'));
}

function lastOperationNeeded(lastIdx) {
	return lastIdx === 3;
}

