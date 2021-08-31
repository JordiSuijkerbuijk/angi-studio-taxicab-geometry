const input = "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5";
// Splits string of instructions and puts into array
const array = input.split(',').join('').split(" ");

const calculateDirection = (previousDirection, turn) => {
  switch (previousDirection) {
    case 'East':
      return turn === 'L' ? 'North' : 'South';
    case 'West':
      return turn === 'L' ? 'South' : 'North';
    case 'North':
      return turn === 'L' ? 'West' : 'East';
    case 'South':
      return turn === 'L' ? 'East' : 'West';
    default:
      break;
  }
}

let fromDirection = 'North';

// Converts array of instructions into the object { from: (fromDirection), to: (toDirection), turn: (R || L), steps: (int), id }
const convertToObject = (array) => {
  return array.map((item, index) => {
    const turn = item.substring(0, 1);
    const amountOfSteps = item.substring(1);
    from = fromDirection;
    const to = calculateDirection(from, turn);
    fromDirection = to

    return {
      id: index + 1,
      fromDirection,
      turn,
      amountOfSteps,
      to,
    };
  });
};

// Checks if position of element in array is odd or even number
const isIdOdd = (id) => {
  return id % 2 == 0;
}

const pushArrayIntoArray = (array, duplicate) => {
  if (duplicate && array.length === 0) array.push(duplicate);
}

let duplicates = [];

const addObjectsToArray = (array, x, y, steps, sign, isOdd) => {
  let tempX = x;
  let tempY = y;
  for (var val = 0; val < steps; val++) {
    if (isOdd) {
      const xCoord = eval(`${tempX}${sign}1`)
      tempX = xCoord;
    }
    else {
      const yCoord = eval(`${tempY}${sign}1`)
      tempY = yCoord;
    }

    const duplicateArray = array.find(item => item.x === tempX && item.y == tempY);
    pushArrayIntoArray(duplicates, duplicateArray);
    array.push({ x: tempX, y: tempY });
  }
}

const returnXYCoordinates = (arrayOfObjects) => {
  let x = 0;
  let y = 0;
  let everyStep = [{ x: 0, y: 0 }];

  arrayOfObjects.map(item => {
    const steps = item.amountOfSteps;
    const sign = (item.to === 'North' || item.to === 'East') ? '+' : '-';
    const isOdd = isIdOdd(item.id)

    addObjectsToArray(everyStep, x, y, steps, sign, isOdd)
    if (isIdOdd(item.id)) {
      x = eval(`${x}${sign}${steps}`);
    }
    else {
      y = eval(`${y}${sign}${steps}`);
    }
  })

  return { x, y }
};

const converted = convertToObject(array);
const endCoordinates = returnXYCoordinates(converted);
const shortestPossiblePath = Math.abs(endCoordinates.x) + Math.abs(endCoordinates.y);

console.log(`The delivery guy is currently ${shortestPossiblePath} blocks away from his destination`)
