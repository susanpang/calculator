import calculate from '../calculate';
/*
AC: at initial state, after an operand, after an operator, after '='
Negate: initially, negate twice, negate -> add a digit -> negate again, before and after operator, after '='
C: at initial state, after an operand, after an operator, after '='
Percent: initially, percent twice, percent -> add a digit -> percent, before and after operator, after '='
Evaluate: initially, after an operator, after negate, after percent, after '=', after '.'
*/
const state1 = {
	expression: ["0", "", "", "", "", ""],
	lastIdx: 0,
	display: "0"
}

function pressEqual(state) {
	let derived = JSON.parse(JSON.stringify(state));
	return calculate(derived, "=");
}

function pressAC(state) {
	let derived = JSON.parse(JSON.stringify(state));
	return calculate(derived, "AC");
}

function pressC(state) {
	let derived = JSON.parse(JSON.stringify(state));
	return calculate(derived, "C");
}

function pressNegate(state) {
	let derived = JSON.parse(JSON.stringify(state));
	return calculate(derived, "+/-");
}

function enterInput(state, input) {
	let derived = JSON.parse(JSON.stringify(state));	// deep copy
	input = input.split("");
	let i;

	for (i = 0; i < input.length; i++) {
		derived = calculate(derived, input[i]);
	}

	return derived;
}

test('%', () => {
	let state = enterInput(state1, "%1600%*1.1=");
	expect(state).toHaveProperty("display", "17.6");

	state = enterInput(state, "%*100%+");
	expect(state).toHaveProperty("display", "0.176");

	state = enterInput(state, "%");
	expect(state).toBeNull();

	state = enterInput(state1, "35000%%*2=");
	expect(state).toHaveProperty("display", "7");

	state = enterInput(state, "365%4%+3=");
	expect(state).toHaveProperty("display", "3.04");
});

test('+/-', () => {
	let state = pressNegate(state1);
	state = enterInput(state, "5*.5=");
	expect(state).toHaveProperty("display", "2.5");

	state = pressNegate(state);
	state = enterInput(state, "+3=");
	expect(state).toHaveProperty("display", "0.5");

	state = enterInput(state, "+3");
	state = pressNegate(state);
	state = pressNegate(state);
	state = enterInput(state, "-");
	expect(state).toHaveProperty("display", "3.5");

	state = enterInput(state, "*");
	state = pressNegate(state);
	state = enterInput(state, "2=");
	expect(state).toHaveProperty("display", "-7");

	state = pressNegate(state);
	state = enterInput(state, "2")
	state = pressNegate(state);
	state = pressEqual(state);
	expect(state).toHaveProperty("display", "-72");
});

test('=', () => {
	let state = pressEqual(state1);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "98.56");
	expect(state).toHaveProperty("display", "98.56");
	state = pressEqual(state);
	expect(state).toHaveProperty("display", "98.56");

	state = enterInput(state, "30%+");
	expect(state).toHaveProperty("display", "0.3");
	state = pressNegate(state);
	expect(state).toHaveProperty("display", "-0");
	state = enterInput(state, "5.2%");
	expect(state).toHaveProperty("display", "-0.052");
	state = pressEqual(state);
	expect(state).toHaveProperty("display", "0.248");

	state = pressEqual(state);
	expect(state).toHaveProperty("display", "0.248");

	state = enterInput(state, "6.9+180*60%*5-33.2*5.0");
	state = pressNegate(state);
	state = pressEqual(state);
	expect(state).toHaveProperty("display", "712.9");

	state = enterInput(state, "-12.=");
	expect(state).toHaveProperty("display", "700.9");

	state = enterInput(state, "5+6-=");
	expect(state).toHaveProperty("display", "11");
});

test('AC', () => {
	let state = pressAC(state1);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "6.9+180*60");
	state = pressAC(state);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "6.9*180/60%");
	state = pressAC(state);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "5/");
	state = pressAC(state);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, ".35=");
	state = pressAC(state);
	expect(state).toHaveProperty("display", "0");
});

test('C', () => {
	let state = pressC(state1);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "6.9+180*60");
	state = pressC(state);
	state = enterInput(state, "0.5=");
	expect(state).toHaveProperty("display", "96.9");

	state = pressC(state);
	expect(state).toHaveProperty("display", "0");

	state = enterInput(state, "6.9*180/60%");
	state = pressC(state);
	state = enterInput(state, "2=");
	expect(state).toHaveProperty("display", "621");

	state = pressC(state);
	state = enterInput(state, "5/");
	state = pressC(state);
	expect(state).toBeNull();
	
});



