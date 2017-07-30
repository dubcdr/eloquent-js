/**
 *
 * Call / Bind / Apply
 *
 */

let obj = {
  'type': 'fish',
  'age': '18'
};

function info() {
  console.log(`${this.type}: ${this.age}`);
}

function speak(txt) {
  console.log(txt);
  console.log(this.text);
}

info.apply(obj);

speak.apply({
  text: 'world'
}, ['Hello World!']);

/**
 * Prototype
 */

//  Object.prototype
//  Function.prototype
//  Array.prototype

function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let killerRabbit = new Rabbit('killer');
let blackRabbit = new Rabbit('black');

console.log(blackRabbit.type);
blackRabbit.speak('Doom...');

console.log();
console.log();

Rabbit.prototype.teeth = 'small';

console.log(`${blackRabbit.teeth}`);

/**
 *
 *  JavaScript distinguishes between enumerable and nonenumerable properties.
 *
 *  All properties that we create by simply assigning to them are enumerable.
 *  The standard properties in Object.prototype are all nonenumerable, which is why they do not show up in such a for/in loop.
 *
 *  It is possible to define our own nonenumerable properties by using the Object.defineProperty function
 *
 */

let map = {};

console.log(map.hasOwnProperty('toString'));
// false

console.log(map.hasOwnProperty('age'));
map.age = 10;
console.log(map.hasOwnProperty('age'));


// for (var name in map) {
//   if (map.hasOwnProperty(name)) {
//     // ... this is an own property
//   }
// }

let prototypelessObj = Object.create(null);

/**
 *  LAYING OUT A TABLE
 */

function rowHeights(rows) {
  return rows.map((row) => {
    return row.reduce((max, cell) => {
      return Math.max(max, cell.minHeight());
    }, 0);
  })
};

function colWidths(rows) {
  return rows[0].map((_, i) => {
    return rows.reduce((max, row) => {
      return (max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  let heights = rowHeights(rows);
  let widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map((block) => {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    let blocks = row.map((cell, colNum) => {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map((_, lineNo) => {
      return drawLine(blocks, lineNo);
    }).join("\n")
  }

  return rows.map(drawRow).join('\n');
}

function repeat(string, times) {
  let result = '';
  for (let i = 0; i < times; i++) result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split('\n');
}

TextCell.prototype.minWidth = function () {
  return this.text.reduce((width, line) => {
    return Math.max(width, line.length);
  });
}

TextCell.prototype.minHeight = function () {
  return this.text.length;
}

TextCell.prototype.draw = function (width, height) {
  let result = [];
  for (let i = 0; i < height; i++) {
    let line = this.text[i] || '';
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
}

let rows = [];
for (let i = 0; i < 5; i++) {
  let row = [];
  for (let j = 0; j < 5; j++) {
    if ((j + 1) % 2 == 0) {
      row.push(new TextCell('##'));
    } else {
      row.push(new TextCell('  '));
    }
    rows.push(row);
  }
}
console.log(drawTable(rows));

rows = [];
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  rows.push(row);
}

// console.log(rows);

console.log(drawTable(rows));

/**
 *  INHERITANCE
 */

function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};
