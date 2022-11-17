// let row1Squares = document.querySelector('.row1').childNodes;
// let guess = "CRANE", i = 0;
// for(let square of row1Squares) {
//     console.log(row1Squares[i]);
//     square.innerText = guess[i];
//     i++;
// }

// let row1 = document.querySelector('.row1');
// row1.addEventListener('keyup', (e) => {
//     console.log(e.target);
// })

window.addEventListener('keyup', (e) => {
    let square = document.querySelector('.square1');
    let code = e.code;
    let len = code.length;
    square.innerText = code[len-1];
console.log(typeof e.code);
})