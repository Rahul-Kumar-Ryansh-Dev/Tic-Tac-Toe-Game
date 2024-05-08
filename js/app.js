let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector(".reset-btn");
let newgame = document.querySelector("#newgm");
let msg = document.querySelector("#msg");
let messagebox = document.querySelector(".msgbox");
let overlay = document.querySelector(".overlay");
let turnO = true;
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "x";
      turnO = true;
    }
    box.disabled = true;

    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congrats, Winner is ${winner}`;

  messagebox.classList.remove("hide");
  
  overlay.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
      }
    }
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  messagebox.classList.add("hide");
  overlay.classList.add("hide");
  
};
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  messagebox.classList.remove("hide");
  overlay.classList.remove("hide");
  disableBoxes();
};
newgame.addEventListener("click", resetGame);
restbtn.addEventListener("click", resetGame);
