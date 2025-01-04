let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let new_game_btn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let heade = document.querySelector(".heade");

let turn0 = false;

const darkModeBtn = document.querySelector("#dark-mode-btn");
let isDarkMode = false;

darkModeBtn.addEventListener("click", () => {
    if (isDarkMode) {
        document.body.classList.remove("dark-mode");
        // Correctly use the header variable
        darkModeBtn.innerText = 'Switch to Dark Mode';
        darkModeBtn.style.backgroundColor = "white";
        darkModeBtn.style.color = "black";
        heade.style.background = 'linear-gradient(orange, #deb887)';
        heade.style.color = 'black';

        resetBtn.style.backgroundColor = "white";
        resetBtn.style.color = "black";

        new_game_btn.style.backgroundColor = "white";
        new_game_btn.style.color = "black";
        
        isDarkMode = false;
    } else {
        document.body.classList.add("dark-mode"); // Correctly use the header variable
        darkModeBtn.innerText = 'Switch to Light Mode'; // Update button text
        // Dark mode styles for the button
        darkModeBtn.style.backgroundColor = "#333"; // Dark background for the button
        darkModeBtn.style.color = "white";

        heade.style.background = 'linear-gradient(rgb(59, 0, 0), black)';
        heade.style.color = 'white';

        resetBtn.style.backgroundColor = "#333"; // Dark background for the button
        resetBtn.style.color = "white";

        new_game_btn.style.backgroundColor = "white";
        new_game_btn.style.color = "black";
        
        isDarkMode = true;
    }
});

// 0 1 2
// 3 4 5
// 6 7 8
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 4, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        for (let box of boxes) {
            box.style.backgroundColor = "#795924"
        }
        box.innerText = "";
    }
}

const showWinner = (pos1val) => {
    msg.innerText = `Congraturations! the winner is ${pos1val}`;
    msgContainer.classList.remove("hide");
}

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos1val == pos2val && pos2val == pos3val) {
            if (pos1val != "" && pos1val == pos2val && pos2val == pos3val) {
                [pattern[0], pattern[1], pattern[2]].forEach((index) => {
                    boxes[index].style.backgroundColor = "limegreen";
                });
            }
            console.log("winner", pos1val);
            showWinner(pos1val);
            disableBoxes();
            return true;
        }
    }
};

let moveCount = 0; // Keep track of moves

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting a filled box
        box.innerText = turn0 ? "O" : "X";
        turn0 = !turn0; // Toggle turn
        moveCount++; // Increment move count

        if (checkWinner()) return; // Check for a winner

        // If move count reaches 9 and no winner, it's a draw
        if (moveCount === 9) {
            alert("It's a draw!");
        }
    });
});

const resetGame = () => {

    turn0 = false; // Reset to Player X's turn
    enableBoxes();
    moveCount = 0; // Reset move count
    msgContainer.classList.add("hide");
};

// Reset button logic
resetBtn.addEventListener("click", resetGame);
new_game_btn.addEventListener("click", resetGame);