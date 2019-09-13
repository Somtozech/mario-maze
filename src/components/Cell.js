import React from 'react';
import mario from '../images/mario.png';
import mushroom from '../images/mushroom.png';

export default function Cell({ value }) {
	return <div className="cell">{getValue(value)}</div>;
}

function getValue(value) {
	if (value.isMushroom)
		return <img src={mushroom} width="40" height="40" alt="mushroom"></img>;
	if (value.isMario)
		return <img src={mario} width="40" height="40" alt="mario"></img>;
	return null;
}
