import React, { Component } from 'react';
import { initBoardData, findMario } from '../utils/board';

import Cell from './Cell';

export default class Board extends Component {
	constructor(props) {
		super(props);
		const { width, height, mushrooms } = this.props;
		const getData = width && height;
		const data = getData ? initBoardData(height, width, mushrooms) : [];
		this.state = {
			data,
			moves: 0,
			remainingMushrooms: mushrooms
		};
	}

	componentDidMount() {
		const keycodes = [37, 38, 39, 40];
		document.addEventListener('keydown', e => {
			if (keycodes.includes(e.keyCode)) {
				this.handleKeyDown(e.key);
			}
		});
	}

	handleKeyDown = key => {
		const { data, moves, remainingMushrooms } = this.state;

		const updatedData = data.slice();
		let remaining = remainingMushrooms;
		const { x, y } = findMario(data);
		if (key === 'ArrowUp') {
			if (updatedData[x - 1] && updatedData[x - 1][y]) {
				updatedData[x][y].isMario = false;
				updatedData[x - 1][y].isMario = true;
				if (updatedData[x - 1][y].isMushroom) {
					remaining--;
					updatedData[x - 1][y].isMushroom = false;
				}
			}
		}
		if (key === 'ArrowDown') {
			if (updatedData[x + 1] && updatedData[x + 1][y]) {
				updatedData[x][y].isMario = false;
				updatedData[x + 1][y].isMario = true;
				if (updatedData[x + 1][y].isMushroom) {
					remaining--;
					updatedData[x + 1][y].isMushroom = false;
				}
			}
		}
		if (key === 'ArrowLeft') {
			if (updatedData[x][y - 1]) {
				updatedData[x][y].isMario = false;
				updatedData[x][y - 1].isMario = true;
				if (updatedData[x][y - 1].isMushroom) {
					updatedData[x][y - 1].isMushroom = false;
					remaining--;
				}
			}
		}
		if (key === 'ArrowRight') {
			if (updatedData[x][y + 1]) {
				updatedData[x][y].isMario = false;
				updatedData[x][y + 1].isMario = true;
				if (updatedData[x][y + 1].isMushroom) {
					remaining--;
					updatedData[x][y + 1].isMushroom = false;
				}
			}
		}

		if (remaining === 0) {
			alert(`Game Over. Total Moves to Save Princess : ${moves}`);
		}

		this.setState({
			data: updatedData,
			moves: moves + 1,
			remainingMushrooms: remaining
		});
	};

	render() {
		const { width, height } = this.props;
		const { data, moves } = this.state;

		return (
			<React.Fragment>
				{height && width ? (
					<React.Fragment>
						<div className="moves">
							Moves : <span>{moves}</span>
						</div>
						<div
							className="board"
							style={{ width: 40 * width, height: 40 * height }}
						>
							{data.map(row => {
								return row.map(value => (
									<Cell
										key={`${value.x}${value.y}`}
										value={value}
										onClick={() => this.handleClick(value.x, value.y)}
									></Cell>
								));
							})}
							}
						</div>
					</React.Fragment>
				) : (
					<div>Specify Board's height and width</div>
				)}
			</React.Fragment>
		);
	}
}
