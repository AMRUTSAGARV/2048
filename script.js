document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid"); // querySelector() : allows you to find the first element that matches one or more CSS selectors
  const scoreDisplay = document.getElementById("score"); // getElementById() : returns the element that has the ID attribute with the specified value.
  const resultDispaly = document.getElementById("result");
  const width = 4;
  let squares = [];
  let score = 0;

  // create 4*4 board

  function createBoard() {
    for (let i = 0; i < 16; i++) {
      square = document.createElement("div"); // creatElement : creates Element node with specified name
      square.innerHTML = 0;
      gridDisplay.appendChild(square); // appendChild() : put every square with innerHTML 0 in to the grid
      squares.push(square);
    }
    generate(); // when the game starts there should be two 2's
    generate();
  }
  createBoard();

  // randomly generate 2

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length); // Math.floor() : rounds a number downwards to the nearest integer,
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkZero();
    } else {
      generate();
    }
  }

  // check whether Game Over or not

  function checkZero() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++; // count no. of 0's. if none present , then Game Over
      }
    }
    if (zeros === 0) {
      resultDispaly.innerHTML = "You Lose ..!";
      document.removeEventListener("keyup", control); // removeEventListener : Remove a event that has been attached with the addEventListener() method:
    }
  }

  // Check if player Wins or not (Wins if he reached 2048)

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDispaly.innerHTML = "You Win..!";
        document.removeEventListener("keyup", control);
      }
    }
  }

  // swipe right

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        // now these numbers are in the form of stirngs. we need to change it into intergers

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ]; // parseInt() : parses a string and returns an integer.
        let filteredRow = row.filter((num) => num); // filter() : creates an array filled with all array elements that pass a test (provided as a function).
        // it filter out all the number from our rows

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0); // fill() :  fills the specified elements in an array with a static value.
        let newRow = zeros.concat(filteredRow); // concat() : used to join two or more strings.

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // swipe left

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe DOwn

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredCol = column.filter((num) => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredCol);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }
  // swipe Up

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredCol = column.filter((num) => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredCol.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // add all the digits in a row as per the left or right movement

  function combineRow() {
    // we dont need to check 16th squares right square

    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  // add all the digits in a row as per the up or down movement

  function combineCol() {
    // we are checking the square below the square we are looping over

    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  // keyboard control

  function control(e) {
    if (e.key === "ArrowRight") {
      keyRight();
    } else if (e.key === "ArrowLeft") {
      keyLeft();
    } else if (e.key === "ArrowUp") {
      keyUp();
    } else if (e.key === "ArrowDown") {
      keyDown();
    }
  }

  document.addEventListener("keyup", control);
  // listen to our page any time we press a key (need to ivoke the control function)

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyDown() {
    moveDown();
    combineCol();
    moveDown();
    generate();
  }

  function keyUp() {
    moveUp();
    combineCol();
    moveUp();
    generate();
  }
});
