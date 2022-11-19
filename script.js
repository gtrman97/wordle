// let word = fetch("https://words.dev-apis.com/word-of-the-day")
//   .then((res) => res.json())
//   .then((body) => body.word)
//   .catch((error) => console.error(error));
// console.log(`word of the day is ${word}`);

// let word = null;

// async function getWordOfDay(){
//     let response = await fetch('https://words.dev-apis.com/word-of-the-day');
//     let body = await response.json();
//     let answer = body.word;
//     // console.log(word.toUpperCase());
//     // word = answer.toUpperCase();
//     // return word.toUpperCase()
// }
// async function getWord(){
//   let word = await getWordOfDay();
//   return word;
// }
// getWordOfDay();
// console.log(`word of the day is ${word}`);
// let row = 1;
// let character = 0;

let answer = "IVORY";
let ANSWER_LENGTH = 5;

let currentGuess = {
  row: 1,
  character: 0,
  guess: ""
};

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  let letter = e.key;
  if (currentGuess.character < ANSWER_LENGTH && isLetter(letter)) guessLetter(letter);
  if (isBackspaceKey(letter)) deleteCharacter();
  if (currentGuess.character === ANSWER_LENGTH && isEnterKey(letter)) guessWord(currentGuess.guess);
  if (currentGuess.row === 7) console.log("you lose");
  console.log(`row is ${currentGuess.row} and char is ${currentGuess.character}`);
  console.log(`current guess so far is ${currentGuess.guess}`);
});

function guessLetter(letter) {
  let squares = document.querySelector(`.row${currentGuess.row}`).children;
  squares[currentGuess.character].innerText = letter.toUpperCase();
  currentGuess.guess += letter.toUpperCase();
  currentGuess.character++;
}

function guessWord(word) {
  let squares = document.querySelector(`.row${currentGuess.row}`).children;
  if (word === answer) alert("You Win!");
  // if(word === answer) alert("good guess!");
  for (let i = 0; i < 5; i++) {
    if (answer.includes(word[i])) {
      if (word[i] === answer[i]) {
        squares[i].style.backgroundColor = "green";
      } else {
        squares[i].style.backgroundColor = "#daa520";
      }
    } else {
      squares[i].style.backgroundColor = "gray";
    }
    squares[i].style.color = "white";
  }
  incrementRow();
}

function incrementRow() {
  currentGuess.row++;
  currentGuess.character = 0;
}
function endGame() {
  alert("You Win!");
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function isBackspaceKey(letter) {
  return letter === "Backspace";
}
function isEnterKey(letter) {
  return letter === "Enter";
}
function deleteCharacter() {
  if (!currentGuess.character) return;
  currentGuess.character--;
  let squares = document.querySelector(`.row${currentGuess.row}`).children;
  squares[currentGuess.character].innerText = "";
  currentGuess.guess = currentGuess.guess.substring(0, currentGuess.guess.length-1);
}

async function validateWord() {

  let response = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    mode: "cors",
    "word": "crane",
    headers: {
      'content-type': 'application/json'
    }
  });
  let body = await response.json();
  let isValid = body.validWord;
  console.log(isValid);
}
validateWord();