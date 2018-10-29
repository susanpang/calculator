import React from 'react'

//import "./Display.css"

export default class Display extends React.Component {
	render() {
		return (
			<div className="display">
				{this.props.value}
			</div>
		);
	}
}