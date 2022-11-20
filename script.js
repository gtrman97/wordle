async function init() {
  let result = document.querySelector(".result");
  let ANSWER_LENGTH = 5;
  let done = false;
  let isLoading = true;
  let currentGuess = {
    row: 1,
    character: 0,
    guess: "",
  };
  let response = await fetch("https://words.dev-apis.com/word-of-the-day");
  let responseObject = await response.json();
  let answer = responseObject.word.toUpperCase();
  setLoading(false);
  let answerMap = makeMap(answer);

  window.addEventListener("keyup", (e) => {
    if (isLoading || done) return;
    let letter = e.key;
    if (currentGuess.character < ANSWER_LENGTH && isLetter(letter))
      guessLetter(letter);
    if (isBackspaceKey(letter)) deleteCharacter();
    if (currentGuess.character === ANSWER_LENGTH && isEnterKey(letter))
      guessWord(currentGuess.guess);
      console.log(`row is ${currentGuess.row}`);
  });

  function guessLetter(letter) {
    let squares = document.querySelector(`.row${currentGuess.row}`).children;
    squares[currentGuess.character].innerText = letter.toUpperCase();
    currentGuess.guess += letter.toUpperCase();
    currentGuess.character++;
  }

  async function guessWord(word) {
    console.log(answerMap);

    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess.guess }),
    });
    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const { validWord } = resObj; This line is equivalent to previous two lines
    setLoading(false);

    if (!validWord) {
      markInvalidWord();
      return;
    }

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
        answerMap[word[i]]--;
      } else {
        squares[i].classList.add("incorrect");
      }
    }
    incrementRow();
    if (currentGuess.row === 7) playerLoses();
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
    done = true;
  }

  function playerLoses() {
    let heading = document.querySelector(".heading");
    heading.innerText = `The word was ${answer}`;
    result.style.color = "red";
    result.innerText = "You Lose!";
    result.style.visibility = "visible";
    done = true;
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
  function markInvalidWord() {
    let squares = document.querySelector(`.row${currentGuess.row}`).children;
    for (let square of squares) {
      square.classList.add("invalid-word");
      setTimeout(() => {
        square.classList.remove("invalid-word");
      }, 1000);
    }
  }
  function setLoading(bool) {
    isLoading = bool;
    result.classList.toggle("hide-loading", !isLoading);
  }
}
function makeMap(word) {
  const o = {};
  for (let char of word) {
    if (!o[char]) o[char] = 1;
    else o[char]++;
  }
  return o;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
