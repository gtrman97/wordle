// let row1Squares = document.querySelector('.row1').children;
// console.log(row1Squares);
// let word = "CRANE", i = 0;
// for(let square of row1Squares) {
//     // console.log(row1Squares[i]);
//     square.innerText = word[i];
//     i++;
// }

// let row1 = document.querySelector('.row1');
// row1.addEventListener('keyup', (e) => {
//     console.log(e.target);
// })

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

let guess = {
  row: 1,
  character: 0,
};

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  let letter = e.key;
  if(guess.character === 5 && isEnterKey(letter)) guessWord();
  if(isBackspaceKey(letter)) deleteCharacter();
  if(isLetter(letter)) guessLetter(letter);
  console.log(`row is ${guess.row} and char is ${guess.character}`);
  if (guess.character === 5) incrementRow();
  if (guess.row === 7) {
    setTimeout(() => {
      endGame();
    }, 1000);
  }
});

function guessLetter(letter) {
  let squares = document.querySelector(`.row${guess.row}`).children;
  squares[guess.character].innerText = letter.toUpperCase();
  guess.character++;
}

function guessWord(){
  console.log("POOPS!");
  let squares = document.querySelector(`.row${guess.row}`).children;
  let word = "";
  for(let square of squares) {
    word += square.innerText;
  }

  console.log(word);

}

function incrementRow() {
  guess.row++;
  guess.character = 0;
}
function endGame() {
  alert("You Win!");
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function isBackspaceKey(letter){
  return letter === "Backspace";
}
function isEnterKey(letter) {
  return letter === "Enter";
}
function deleteCharacter(){
  if(!guess.character) return; 
  guess.character--;
  let squares = document.querySelector(`.row${guess.row}`).children;
  squares[guess.character].innerText = "";
  
}