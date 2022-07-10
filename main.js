'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
let move = 0;

// Start here. What is this function doing?
  // This function prints the current state of the towers
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
  // This function should move a piece from one stack to another.
  // The prompt showed no inputs, but I can't see a way to make it work without them.
  // Since the value of each key is an array, the last element (top stone)
  // can be removed with the pop() method, and added to another with push()
const movePiece = (startStack, endStack) => {
  // Your code here
  let popped = stacks[startStack].pop();
  stacks[endStack].push(popped);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
  // Again, this function looks like it needs 2 inputs to be able to work.
  // We can get the value of the final number with the .length property (minus 1)
  // Since the array values are numbers, we can use the > operator
const isLegal = (startStack, endStack) => {
  // Your code here
  let startLast = stacks[startStack].length - 1
  let endLast = stacks[endStack].length - 1 
  if (stacks[startStack][startLast] > stacks[endStack][endLast]) {
    console.log("That move is illegal.")
    return false;
  }
  else {return true}

}
//   Here's a function I added to count the number of moves 
const moveCounter = () => {
  move++
  console.log("Number of moves taken: " + move)
}
// What is a win in Towers of Hanoi? When should this function run?
  // I originally tried checking if stacks = [4, 3, 2, 1] in B or C, but
  // this didn't work. Then I realized that if isLegal() is working,
  // there will only be 4 items in B or C if the player has won.
const checkForWin = () => {
  if (stacks['b'].length === 4 || stacks['c'].length === 4) {
    console.log("Congratulations! You win!");
		return true
  }
  else return false
}


// When is this function called? What should it do with its argument?
  // This function needs to run the other functions, with startStack and 
  // endStack as inputs. It must see if the move is legal, execute the move,
  // then check for a win.
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
    moveCounter()
    checkForWin()
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {


  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
// my tests
// Everything else is already tested for, so I wasn't sure what tests to make.
// I ended up creating a test for the function I added to count moves.
describe('#moveCounter()', () => {
  it('should detect the total number of moves taken', () => {
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
    move = 0;
    towersOfHanoi('a', 'b');
    towersOfHanoi('a', 'c');
    towersOfHanoi('b', 'c');
    assert.equal(move, 3);
  });
});
} else {

  getPrompt();

}
