// let word = fetch("https://words.dev-apis.com/word-of-the-day")
//   .then((res) => res.json())
//   .then((body) => body.word)
//   .catch((error) => console.error(error));
// console.log(`word of the day is ${word}`);
async function init() {
  let response = await fetch("https://words.dev-apis.com/word-of-the-day");
  let responseObject = await response.json();
  let word = responseObject.word.toUpperCase();
  setLoading(false);
  // console.log(`word of the day is ${word}`);
  // word = answer.toUpperCase();
  // return word.toUpperCase()
}
let result = document.querySelector(".result");
let answer = "IVORY";
let ANSWER_LENGTH = 5;
let won_game = false;

init();
let currentGuess = {
  row: 1,
  character: 0,
  guess: "",
};

window.addEventListener("keyup", (e) => {
  // console.log(e.key);
  let letter = e.key;
  if (currentGuess.character < ANSWER_LENGTH && isLetter(letter))
    guessLetter(letter);
  if (isBackspaceKey(letter)) deleteCharacter();
  if (currentGuess.character === ANSWER_LENGTH && isEnterKey(letter))
    guessWord(currentGuess.guess);
  if (currentGuess.row === 7 && !won_game) playerLoses();
});

function guessLetter(letter) {
  let squares = document.querySelector(`.row${currentGuess.row}`).children;
  squares[currentGuess.character].innerText = letter.toUpperCase();
  currentGuess.guess += letter.toUpperCase();
  currentGuess.character++;
}

function guessWord(word) {
  let answerMap = makeMap(answer);
  console.log(answerMap);

  let squares = document.querySelector(`.row${currentGuess.row}`).children;
  if (word === answer) playersWins();
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (answer.includes(word[i])) {
      if (word[i] === answer[i]) {
        squares[i].classList.add("correct");
        answerMap[word[i]]--;
      }
    }
  }
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (squares[i].classList.contains("correct")) continue;
    if (answerMap[word[i]]) {
      squares[i].classList.add("close");
    } else {
      squares[i].classList.add("incorrect");
    }
  }
  incrementRow();
}

function makeMap(word) {
  const freq = {};
  for (let char of word) {
    if (!freq[char]) freq[char] = 1;
    else freq[char]++;
  }
  return freq;
}

function incrementRow() {
  currentGuess.row++;
  currentGuess.character = 0;
  currentGuess.guess = "";
}
function playersWins() {
  let header = document.querySelector(".heading");
  header.classList.add("winning");
  result.style.color = "lightgreen";
  result.innerText = "You Win!";
  result.style.visibility = "visible";
  won_game = true;
}

function playerLoses() {
  result.style.color = "red";
  result.innerText = "You Lose!";
  result.style.visibility = "visible";
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
  currentGuess.guess = currentGuess.guess.substring(
    0,
    currentGuess.guess.length - 1
  );
}

function setLoading(isLoading) {
  result.classList.toggle("hide-loading", !isLoading);
}

async function validateWord() {
  let response = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    mode: "cors",
    word: "crane",
    headers: {
      "content-type": "application/json",
    },
  });
  let body = await response.json();
  let isValid = body.validWord;
  console.log(isValid);
}
validateWord();
