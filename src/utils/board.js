function generateData(height, width) {
	const data = [];
	for (let i = 0; i < height; i++) {
		data[i] = [];
		for (let j = 0; j < width; j++) {
			data[i][j] = {
				x: i,
				y: j,
				isMushroom: false,
				isMario: false
			};
		}
	}
	return data;
}

function plantMushrooms(data, height, width, mushrooms) {
	let mushroomPlanted = 0;
	while (mushroomPlanted < mushrooms) {
		let x = Math.floor(Math.random() * height);
		let y = Math.floor(Math.random() * width);
		if (!data[x][y].isMushroom) {
			data[x][y].isMushroom = true;
			mushroomPlanted++;
		}
	}
	return data;
}

function plantMario(data, height, width) {
	let marioPlanted = 0;
	while (marioPlanted < 1) {
		let x = Math.floor(Math.random() * height);
		let y = Math.floor(Math.random() * width);
		if (!data[x][y].isMushroom) {
			data[x][y].isMario = true;
			marioPlanted++;
		}
	}
	return data;
}

function initBoardData(height, width, mustrooms) {
	const emptyArray = generateData(height, width);
	const addMushroomToData = plantMushrooms(
		emptyArray,
		height,
		width,
		mustrooms
	);
	const addMarioToData = plantMario(addMushroomToData, height, width);
	return addMarioToData;
}

function findMario(data) {
	for (let i = 0; i < data.length; i++) {
		const mario = data[i].find(cell => cell.isMario === true);
		if (mario) return mario;
	}
}

exports.initBoardData = initBoardData;

exports.findMario = findMario;
