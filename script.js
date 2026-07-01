const gameBody = document.getElementById("game-body");
const gameText = document.getElementById("game-text");

const bestScoreDisplay = document.getElementById("best-score");
const recentScoreDisplay = document.getElementById("recent-score");

let currentState = "start";
let timeoutId = null;
let startTime = 0;
let bestScore = Infinity;


function handleInput() {
    switch (currentState) {
        case "start":
            startWaitingPhase();
            break;
        case "waiting":
            clearTimeout(timeoutId);
            gameBody.className = "state-early";
            gameText.innerHTML =
                "Too Early!<br><span style='font-size:1.3rem;'>Click to try again</span>";
            currentState = "result";
            break;
        case "go":
            const reactionTime =
                Math.round(performance.now() - startTime);
            recentScoreDisplay.textContent = reactionTime;

            if (reactionTime < bestScore) {
                bestScore = reactionTime;
                bestScoreDisplay.textContent = bestScore;
            }
            gameBody.className = "state-result";
            gameText.innerHTML =
                `${reactionTime} ms<br><span style="font-size:1.3rem;">Click to play again</span>`;
            currentState = "result";

            break;

        case "result":
            startWaitingPhase();
            break;
    }
}
function startWaitingPhase() {
    currentState = "waiting";
    gameBody.className = "state-waiting";
    gameText.textContent = "Wait for green...";
    const randomDelay = Math.random() * 3000 + 1500;
    timeoutId = setTimeout(() => {
        currentState = "go";
        gameBody.className = "state-go";
        gameText.textContent = "GO!";
        startTime = performance.now();
    }, randomDelay);
}

window.addEventListener("mousedown", function () {
    handleInput();
});

window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        handleInput();
    }
});
