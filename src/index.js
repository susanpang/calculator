import React from 'react';
import ReactDOM from 'react-dom';

import Display from './Display';
import Panel from './Panel';
import calculate from './calculate';

//import './index.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
				
		this.state = {
			expression: ["0", "", "", "", "", ""],
			lastIdx: 0,
			display: "0"
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(buttonName) {
		const result = calculate(this.state, buttonName);
		if (result)
			this.setState(result);
	}

	render() {
		return (
			<div className="calculator">
				<Display value={this.state.display} />
				<Panel clickHandler={this.handleClick} />
			</div>
		);
	}
}

//ReactDOM.render(<App />, document.getElementById("root"));