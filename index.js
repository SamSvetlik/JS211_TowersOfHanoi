// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null
let move = 0

const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  console.log("Yay, we clicked an item", row)
  console.log("Here are the stones on this row: ", row.children)

  if (stone === null) {
    pickUpStone(row.id)
    }
  else {dropStone(row.id)
    checkForWin()
    }
  }

const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  if (selectedRow.lastElementChild === null) {
    console.log("This row has no stones to pick up.")
  }
  else {
    stone = selectedRow.removeChild(selectedRow.lastElementChild);
    console.log("There is a stone in your hand: " + stone.id)
    const highTone = new Audio('highTone.mp3');
    highTone.play();
  }
}

const dropStone = (rowID, rock) => {
  console.log(rowID)
  rock = stone
  // Somehow stone becomes undefined if it is a function parameter.
  console.log(stone)
  let target = document.getElementById(rowID)
  if (target.children.length === 0) {
    target.appendChild(stone)
    stone = null
    const lowTone = new Audio('lowTone.mp3')
    lowTone.play()
    moveCounter()
  }
  else if (stone.id > target.lastElementChild.id) {
  console.log("That is an illegal move.")
  }
  else {
    target.appendChild(stone)
    stone = null
    const lowTone = new Audio('lowTone.mp3')
    lowTone.play()
    moveCounter()
  }
}

const checkForWin = () => {
  let top = document.getElementById("top-row")
  let mid = document.getElementById("middle-row")
  if (top.children.length === 4 || mid.children.length === 4) {
    const winner = new Audio('winner.mp3');
    winner.play();
    alert("Congratulations! You win!")
  }
}
const moveCounter = () => {
  move++
  console.log("Number of moves taken: " + move)
  document.getElementById("moveContainer").innerText = "Total moves: " + move
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

