const game = document.getElementById("game");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

const cardBack = "\u{1F0A0}";
const cards = [
    "\u{1F0A1}","\u{1F0A1}","\u{1F0A2}","\u{1F0A2}","\u{1F0A3}","\u{1F0A3}","\u{1F0A4}","\u{1F0A4}",
    "\u{1F0A5}","\u{1F0A5}","\u{1F0A6}","\u{1F0A6}","\u{1F0A7}","\u{1F0A7}","\u{1F0A8}","\u{1F0A8}"
];

let flipped = [];
let moves = 0;
let time = 0; 
let interval = null;

function createGame() {
    game.innerHTML = "";

    // Shuffle swap each index with a random index
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i]
        cards[i] = cards[j];
        cards[j] = temp;
    }

    // Render
    cards.forEach(val => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = cardBack;

        card.onclick = () => {
            if (flipped.length < 2 && !card.classList.contains("flipped")) {
                if (!interval) {
                    interval = setInterval(() => {
                        time++;
                        timerDisplay.textContent = time;
                    }, 1000);
                }
                    
                card.textContent = val;
                card.classList.add("flipped");
                flipped.push(card);

                if (flipped.length === 2) {
                    moves++
                    movesDisplay.textContent = moves;

                    if (flipped[0].textContent === flipped[1].textContent) {
                        flipped.forEach(c => c.classList.replace("flipped", "matched"));
                        flipped = [];

                        // Stop timer if all cards matched
                        if (document.querySelectorAll(".matched").length === cards.length) {
                            clearInterval(interval);
                            interval = null;
                        }
                    } else {
                        setTimeout(() => {
                            flipped.forEach(c => { c.textContent = cardBack; c.classList.remove("flipped"); });
                            flipped = [];
                        }, 800);
                    }
                }
            }
        };
        game.appendChild(card);
    });
}

restartBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    time = 0;
    moves = 0;
    timerDisplay.textContent = 0;
    movesDisplay.textContent = 0;
    flipped = [];
    createGame();
};

createGame();
