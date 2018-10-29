import React from 'react';
//import './Panel.css'
import Button from './Button';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(buttonName) {
		this.props.clickHandler(buttonName);
	}

	render() {
		return (
			<div className="panel">
				<div>
					<Button id={"AC"} name={"AC"} onClick={this.handleClick} />
					<Button id={"C"} name={"C"} onClick={this.handleClick} />
					<Button id={"percent"} name={"%"} onClick={this.handleClick} />
					<button id={"divide"} onClick={() => this.props.clickHandler("/")}>&divide;</button>
				</div>
				<div>
					<Button id={"seven"} name={"7"} onClick={this.handleClick} />
				 	<Button id={"eight"} name={"8"} onClick={this.handleClick} />
				 	<Button id={"nine"} name={"9"} onClick={this.handleClick} />
				 	<button id={"times"} onClick={() => this.props.clickHandler("*")}>&times;</button>
				 </div>
				 <div>
				 	<Button id={"four"} name={"4"} onClick={this.handleClick} />
				 	<Button id={"five"} name={"5"} onClick={this.handleClick} />
				 	<Button id={"six"} name={"6"} onClick={this.handleClick} />
				 	<button id={"minus"} onClick={() => this.props.clickHandler("-")}>&minus;</button>
				 </div>
				 <div>
				 	<Button id={"one"} name={"1"} onClick={this.handleClick} />
				 	<Button id={"two"} name={"2"} onClick={this.handleClick} />
				 	<Button id={"three"} name={"3"} onClick={this.handleClick} />
				 	<button id={"plus"} onClick={() => this.props.clickHandler("+")}>+</button>
				 </div>
				 <div>
				 	<Button id={"negate"} name={"+/-"} onClick={this.handleClick} />
				 	<Button id={"zero"} name={"0"} onClick={this.handleClick} />
				 	<Button id={"dot"} name={"."} onClick={this.handleClick} />
				 	<button id={"equal"} onClick={() => this.props.clickHandler("=")}>=</button>
				 </div>
			</div>
		);
	}
}

