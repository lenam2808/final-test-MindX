const squares = document.getElementsByClassName("square");
// const squares = document.querySelectorAll(".square");
const playerTurn = document.getElementById("playerTurn");
const title = document.getElementById("title");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,6,8],
    [0,4,8],
    [2,4,6],
]
const X = "X"
const O = "O"
let currentPlayer = X;
let spaces = Array(9).fill("");
let running = false;

initializeGame()
function initializeGame() {
    startBtn.addEventListener("click", startGame)
    for (const square of squares) {
        square.addEventListener("click", squareClicked)
    }
    restartBtn.addEventListener("click", restartGame)
    if(running == false) {
        restartBtn.setAttribute("disabled", true);
    }
    playerTurn.textContent = `Lượt người chơi: ${currentPlayer}`;
} 

function startGame() {
    running = true;
    title.textContent =  "Hãy chiến đấu hết mình!";
}

function squareClicked() {
    const id = this.getAttribute("id");
    if (spaces[id] != "" || !running) {
        return;
    } 

    updateSquare(this, id);
    changePlayer();
}

function updateSquare(square, index) {
    const imgX = "url('./assets/icon/x.png')";
    const imgO = "url('./assets/icon/o.png')";
    spaces[index] = currentPlayer;
    square.style.backgroundImage = (currentPlayer == X) ? imgX : imgO;
    if(checkWinner() !== false) {
        title.innerHTML = `Người chơi ${currentPlayer} đã chiến thắng! <br> Bấm chơi lại để bắt đầu lại!`
        let winningPlayer = checkWinner()
        winningPlayer.map( square => squares[square].style.backgroundColor = "aqua")
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer == X) ? O : X;
    playerTurn.textContent = `Lượt người chơi: ${currentPlayer}`;
}

function checkWinner() {
    for (const condition of winCondition) {
        let [a,b,c] = condition
        if(spaces[a] == "" || spaces[b] == "" || spaces[c] == "") {
            continue;
        }
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            running = false
            return [a,b,c];
        } if (!spaces.includes("")) {
            title.innerHTML = `Chưa có người chiến thắng! <br> Bấm chơi lại để bắt đầu lại!`;
            running = false
        }
    }
    return false
}

function restartGame() {
    running = true
    currentPlayer = X;
    spaces.fill("");
    title.textContent = "Hãy chiến đấu hết mình!"
    playerTurn.textContent = `Lượt người chơi: ${currentPlayer}`;
    for (const square of squares) {
        square.textContent = "";
        square.style.backgroundColor = "#fff"
        square.style.backgroundImage = ""
    }
}
