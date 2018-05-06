/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;
initGame();

dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

//just updating the text content
//document.querySelector('#current-0').textContent = dice;
// dynamically setting 
//document.querySelector('#current-' + activePlayer).textContent = dice;

// updating with html code
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-1').textContent;
//console.log(x);

// events : rolling the dice, by clicking the dice
//function btn() {};

//document.querySelector('.btn-roll').addEventListener('click',btn);
// or could use below as well, as an anonymous function

document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. random number
    var diceN = Math.floor(Math.random() * 6) + 1;
    
    // 2. display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + diceN + '.png';
    
    // 3. update the round score, if not selected one
    if (diceN !== 1) {
        // add score
        roundScore += diceN;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        nextPlayer();
    
    }
     
});

// hold operation
document.querySelector('.btn-hold').addEventListener('click',function(){
    // add CURRENT SCORE to GLOBA score
    scores[activePlayer] += roundScore;    
    
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = '0';    
    
    // Check if player won the game
    if (scores[activePlayer] >= 25) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
        
    } else {
        // Next player
        nextPlayer();        
    }    
    
});

// initialization of a new game
//document.querySelector('.btn-new').addEventListener('click',function(){
//    initGame();
//
//});
document.querySelector('.btn-new').addEventListener('click',initGame);
                                                    

// use of DRY (Don't Repeat Yourself)
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // toggle add when is removed and vise versa
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); 
    
    document.querySelector('.dice').style.display = 'none';
};

function initGame() {
scores = [0, 0]; // to maintain GLOBAL score
roundScore = 0; // to maintain CURRENT (each time)
activePlayer = 0; // 0 > 1st player, 1 > 2nd player
    
//hiding the dice & selecting the css class to display as 'none'
document.querySelector('.dice').style.display = 'none';

// resetting the counts, score & current
// "getElementByID" is used, faster that "querySelector"
// need to use the ID used in the html page
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#name-0').textContent = 'Player 1';    
document.querySelector('#name-1').textContent = 'Player 2';
document.querySelector('.btn-roll').style.display = 'block';
document.querySelector('.btn-hold').style.display = 'block';    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');     
    
}