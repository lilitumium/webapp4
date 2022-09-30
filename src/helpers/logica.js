let estadoCeldas = (array, days) => {
	let newArray = [0, ...array, 0],
		arrayFinal = newArray.slice() 

	for (let i = 0; i < days; i++) {
		for (let j = 1; j < arrayFinal.length - 1; j++) {
			if (
				(newArray[j - 1] === 0 && newArray[j + 1] === 0) ||
				(newArray[j - 1] === 1 && newArray[j + 1] === 1)
			) {
				arrayFinal[j] = 0
			} else {
				arrayFinal[j] = 1
			}
		}
		newArray = arrayFinal.slice()
	}
	return newArray = arrayFinal.slice(1, 9)
}

let result = estadoCeldas([1, 0, 1, 0, 1, 0, 1, 0], 8)
console.log('Test: 1', result)
result = estadoCeldas([1, 1, 0, 1, 0, 1, 1, 1], 5)
console.log('Test: 2', result)
result = estadoCeldas([1, 0, 0, 0, 0, 1, 0, 0], 1)
console.log('Test: 3', result)
result = estadoCeldas([1, 1, 1, 0, 1, 1, 1, 1], 2)
console.log('Test: 4', result)
