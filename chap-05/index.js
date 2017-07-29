const ancestry = JSON.parse(require('./../data/ancestry'));

/* Flattening */

console.log('------------');
console.log('Flattening');
console.log('------------');
console.log('');

let concatArray = [
  [1, 2, 3],
  [4, 5],
  [6]
];

let result = concatArray.reduce((prev, current) => {
  return prev.concat(current);
})

console.log(`Flattening:`, result);

/* Mother Child Age Difference */

console.log('');
console.log('------------');
console.log('Mother Age Difference');
console.log('------------');
console.log('');

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

let byName = {};
ancestry.forEach((person) => {
  byName[person.name] = person;
});


let differences = ancestry.filter((value) => {
  return byName[value.mother] != null
}).map((person) => {
  return person.born - byName[person.mother].born;
});

console.log('Average difference in age between mother and son', average(differences));

/* Historical Life Expectancy */
console.log('');
console.log('------------');
console.log('Historical Life Expectancy');
console.log('------------');
console.log('');

function findCentury(person) {
  return Math.ceil(person.died / 100);
}

let mappedCenturies = {};
ancestry.forEach((person) => {
  let cent = findCentury(person);
  if (mappedCenturies[cent]) {
    mappedCenturies[cent].push(person.died - person.born);
  } else {
    mappedCenturies[cent] = [person.died - person.born];
  }
});

for (let key in mappedCenturies) {
  console.log(`${key} | ${average(mappedCenturies[key])}`);
}

/* Every and Then Some */
console.log('');
console.log('------------');
console.log('Every And Then Some');
console.log('------------');
console.log('');

function every(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) return false;
  }
  return true;
}

function some(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) return true;
  }
  return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));
