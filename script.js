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

async function getWordOfDay(){
    let response = await fetch('https://words.dev-apis.com/word-of-the-day');
    let body = await response.json();
    let word = body.word;
    console.log(typeof body);
    // console.log(body);
    // console.log(word);
    return word.toUpperCase()
}
getWordOfDay();

// let row = 1;
// let character = 0;
let guess = {
  row: 1,
  character: 0,
};

window.addEventListener("keyup", (e) => {
  guessLetter(guess, e);
  console.log(`row is ${guess.row} and char is ${guess.character}`);
  if (guess.character === 5) incrementRow();
  if (guess.row === 7) {
    setTimeout(() => {
      endGame();
    }, 1000);
  }
});

function guessLetter(guess, e) {
  let squares = document.querySelector(`.row${guess.row}`).children;
  let code = e.code;
  let len = code.length;
  squares[guess.character].innerText = code[len - 1];
  guess.character++;
}

function incrementRow() {
  guess.row++;
  guess.character = 0;
}
function endGame() {
  alert("You Win!");
}
