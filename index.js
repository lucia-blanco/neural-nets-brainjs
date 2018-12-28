////////// FIRST EXAMPLE /////////////////
/* const net = new brain.NeuralNetwork({ hiddenLayers: [3] })

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

  // In train, it does:
  // Forward propagation -> predicts what it'll need
  // Backward propagation -> measures the error and learns 

net.train(trainingData, {
    // log: (error) => console.log(error),
    // logPeriod: 100
  }
);

console.log(net.run([0,0]));
console.log(net.run([0,1]));
console.log(net.run([1,0]));
console.log(net.run([1,1]));*/


/////// WORKING WITH OBJECTS //////////
/* const net = new brain.NeuralNetwork({ hiddenLayers: [3] })

const colors = [
  { green: 0.2, blue: 0.4 },
  { green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { green: 1, blue: 1 },
  { red: 0.8, green: 1, blue: 1 },
  { red: 1, green: 1, blue: 1 },
  { red: 1, green: 0.8, blue: 0.8 },
  { red: 1, green: 0.6, blue: 0.6 },
  { red: 1, green: 0.4, blue: 0.4 },
  { red: 1, green: 0.31, blue: 0.31 },
  { red: 0.8 },
  { red: 0.6, green: 0.2, blue: 0.2 }
];

const brightnesses = [
  { dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 }
];

const trainingData = []

colors.forEach((color, index) => {
  trainingData.push({
    input: color,
    output: brightnesses[index]
  });
});

const stats = net.train(trainingData);

console.log(stats);

console.log(net.run({
  red: 0.9
})); */

////////////// MORE THAN NUMBERS //////////////
/*const net = new brain.NeuralNetwork({ hiddenLayers: [3] })

const restaurants = {
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  "JHOP": "Saturday",
  "Owls": "Sunday"
};

const trainingData = [];

// isn't this for loop the coolest???
for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1},
    output: { [restaurantName]: 1 }
  })
}

const stats = net.train(trainingData);

console.log(stats);

// this asociates a likelyhood to each restaurant
// console.log(net.run({
// 'Wednesday': 1
// }));

// to get the name of the restaurant:
function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  console.log(result);
  let highestValue = 0;
  let highestRestaurantName = '';

  for( let restaurantName in result) {
    if (result[restaurantName] > highestValue) {
      highestValue = result[restaurantName];
      highestRestaurantName = restaurantName;
    }
  }
  return highestRestaurantName;
}

console.log(restaurantForDay('Monday'));*/

/////////// COUNTING TO 5 ////////////////
/*const trainingData = [
  [1,2,3,4,5],
  [5,4,3,2,1]
];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData);

console.log(Math.round(net.run([1,2,3,4])));
console.log(Math.round(net.run([5,4,3])));*/

////////////// PREDICTING MULTIPLE STEPS ///////////////

/*function scaleDown(step) { // normalize
  return {
    open: step.open / 138, // We divide by 138 because the number are very high
    high: step.high / 138, // (and one of the lowest values we can find is 138)
    low: step.low / 138,
    close: step.close / 138
  };
}

function scaleUp(step) { // denormalize
  return {
      open: step.open * 138,
      high: step.high * 138,
      low: step.low * 138,
      close: step.close * 138
  };
}

const scaledData = rawData.map(scaleDown);

const trainingData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20),
];

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4
});

net.train(trainingData, {
  learningRate: 0.005,
  errorThresh: 0.02,
  // log: (stats) => console.log(stats)
});

// console.log(scaleUp(net.run(trainingData[0])));

console.log(net.forecast([
  trainingData[0][0],
  trainingData[0][1],
],3).map(scaleUp));*/

////////////// RECURRENT NEURAL NETWORK /////////
/*const trainingData = [
  '0+0=0',
  '0+1=1',
  '0+2=2',
  '0+3=3',
  '0+4=4',
  '0+5=5',

  '1+0=1',
  '1+1=2',
  '1+2=3',
  '1+3=4',
  '1+4=5',
  '1+5=6',

  '2+0=2',
  '2+1=3',
  '2+2=4',
  '2+3=5',
  '2+4=6',
  '2+5=7',

  '3+0=3',
  '3+1=4',
  '3+2=5',
  '3+3=6',
  '3+4=7',
  '3+5=8',

  '4+0=4',
  '4+1=5',
  '4+2=6',
  '4+3=7',
  '4+4=8',
  '4+5=9',

  '5+0=5',
  '5+1=6',
  '5+2=7',
  '5+3=8',
  '5+4=9',
  '5+5=10',
];

const net = new brain.recurrent.LSTM({ hidden: [20] });

net.train(trainingData, { errorThresh: 0.025 });

console.log(net.run('0+1='));
console.log(net.run('4+2='));
console.log(net.run('2+5='));*/

///////////// NUMBER DETECTOR ///////////////
/*function toArray(string) {
  if (string.length !== 7 * 7) {
    throw new Error('string in wrong size');
  }
  return string.split('').map(toNumber);
}

function toNumber(character) {
  return character === '#' ? 1 : 0;
}

const zero = toArray(
  '#######' +
  '#     #' +
  '#     #' +
  '#     #' +
  '#     #' +
  '#     #' +
  '#######'
);
const one = toArray(
  '   #   ' +
  '   #   ' +
  '   #   ' +
  '   #   ' +
  '   #   ' +
  '   #   ' +
  '   #   '
);
const two = toArray(
  '#######' +
  '#     #' +
  '      #' +
  '     # ' +
  '   #   ' +
  ' #     ' +
  '#######'
);
const three = toArray(
  '#######' +
  '      #' +
  '      #' +
  ' ######' +
  '      #' +
  '      #' +
  '#######'
);
const four = toArray(
  '#     #' +
  '#     #' +
  '#     #' +
  '#######' +
  '      #' +
  '      #' +
  '      #'
);
const five = toArray(
  '#######' +
  '#      ' +
  '#      ' +
  '#######' +
  '      #' +
  '      #' +
  '#######'
);
const six = toArray(
  '      #' +
  '    #  ' +
  '  #    ' +
  ' ######' +
  '#     #' +
  '#     #' +
  '#######'
);
const seven = toArray(
  '#######' +
  '     # ' +
  '    #  ' +
  '   #   ' +
  '  #    ' +
  ' #     ' +
  '#      '
);
const eight = toArray(
  '#######' +
  '#     #' +
  '#     #' +
  '#######' +
  '#     #' +
  '#     #' +
  '#######'
);
const nine = toArray(
  '#######' +
  '#     #' +
  '#     #' +
  '###### ' +
  '      #' +
  '      #' +
  '      #'
);

const net = new brain.NeuralNetwork();
const trainingData = [
  { input: zero, output: { zero: 1 } },
  { input: one, output: { one: 1 } },
  { input: two, output: { two: 1 } },
  { input: three, output: { three: 1 } },
  { input: four, output: { four: 1 } },
  { input: five, output: { five: 1 } },
  { input: six, output: { six: 1 } },
  { input: seven, output: { seven: 1 } },
  { input: eight, output: { eight: 1 } },
  { input: nine, output: { nine: 1 } }
];

net.train(trainingData);

const result = brain.likely(toArray(  
  '#######' +
  '#     #' +
  '#     #' +
  '###### ' +
  '    #  ' +
  '   #   ' +
  ' #     '), net);

console.log(result);*/

///////////// RECOMMENDATION ENGINE ////////////
const trainingData = [
  { input: { blue: 1 }, output: [1] },
  { input: { red: 1 }, output: [1] },
  { input: { black: 1 }, output: [0] },
  { input: { green: 1 }, output: [0] },
  { input: { brown: 1 }, output: [0] },
];

const net = new brain.NeuralNetwork();

net.train(trainingData);
console.log('before: ');
console.log(Array.from(net.run({ blue: 1 })));
console.log(Array.from(net.run({ brown: 1 })));

trainingData.pop();
// pushing without popping makes the net remember that the user didn't like brown in the first place
trainingData.push(
    { input: { brown: 1 }, output: [1] }
);

net.train(trainingData);
console.log('after: ');
console.log(Array.from(net.run({ blue: 1 })));
console.log(Array.from(net.run({ brown: 1 })));
