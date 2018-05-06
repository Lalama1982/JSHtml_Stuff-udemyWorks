// coding challenge - 1
var heightPlayer1 = 100;
var agePlayer1 = 50;

var heightPlayer2 = 100;
var agePlayer2 = 50;

heightPlayer1 = prompt('Player 1 height?');
agePlayer1 = prompt('Player 2 age?');

heightPlayer2 = prompt('Player 2 height?');
agePlayer2 = prompt('Player 2 age?');

var scorePlayer1 = heightPlayer1+(agePlayer1*5);
var scorePlayer2 = heightPlayer2+(agePlayer2*5);

if (scorePlayer1 > scorePlayer2){
    console.log('Player 1 wins with ' + scorePlayer1 + ' points');
} else if (scorePlayer1 < scorePlayer2){
    console.log('Player 2 wins with ' + scorePlayer1+ ' points');
} else if (scorePlayer1 === scorePlayer2) {
    console.log('It\'s a draw with ' + scorePlayer1 + ' points');
}
