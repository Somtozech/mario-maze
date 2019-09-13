import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';
import Start from './components/start';

export default class App extends Component {
	state = {
		height: null,
		width: null,
		mushrooms: null,
		start: false
	};

	handleGameStart = () => {
		this.setState({ start: true });
		const height = prompt('Please Enter Board Height');
		const width = prompt('Please enter board width');

		this.setState({ height, width, mushrooms: height });
	};

	render() {
		const { height, width, mushrooms, start } = this.state;
		return (
			<React.Fragment>
				{start ? (
					<div className="game">
						<Board height={height} width={width} mushrooms={mushrooms}></Board>
					</div>
				) : (
					<Start onClick={this.handleGameStart}></Start>
				)}
			</React.Fragment>
		);
	}
}
