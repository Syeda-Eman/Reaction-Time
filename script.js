const gameBody = document.getElementById('game-body');
const gameText = document.getElementById('game-text');
const bestScoreDisplay = document.getElementById('best-score');
const recentScoreDisplay = document.getElementById('recent-score');

let currentState = "start";
let timeoutId = null;
let startTime = 0;
let bestScore = Infinity;

function handleInput(){
    switch(currentState){
        case 'start':
            startWaitingPhase();
            break;
        case 'waiting':
            clearTimeout(timeoutId);
            gameText.innerHTML = "Too early!<br><span style='font-size: 0.5em;'>Click to try again</span>";
            gameBody.className='state-early';
            currentState = 'result';
            break;
         case 'go':
            const endTime = performance.now();
            const reactionTime = Math.round(endTime - startTime);
            recentScoreDisplay.textContent = reactionTime + 'ms';
            if (reactionTime < bestScore){
                bestScore = reactionTime;
                bestScoreDisplay.textContent = bestScore + "ms";
            }   
            gameText.innerHTML = `${reactionTime} ms<br><span style='font-size:1.5rem'>Click to try again</span>`;
            gameBody.className='state-result';
            currentState = 'result';
            break;
        case 'result':
            startWaitingPhase();
            break;
    }
}
function startWaitingPhase(){
    currentState = 'waiting';
    gameText.textContent = "Wait for green...";
    gamebody.className='state-waiting';
    const randomDelay = Math.random()*3000+1500;
    timeoutId = setTimeout(()=>{
        currentState = 'go';
        gameText.textContent = 'GO!';
        gameBody.className= 'state-go';
        startTime = performance.now();
    }, randomDelay);
}

window.addEventListener('mousedown',(e)=>{
    if (e.target.tagName !== 'Button'){
        handleInput();
    }
});
window.addEventListener('keydown',(e)=>{
    if (e.key === ' '|| e.key === 'Space'){
        handleInput();
    }
});
