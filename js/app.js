/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

let array = Array.prototype.slice.call(document.getElementsByClassName('card'));
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cards = document.getElementsByClassName('card');
let numberOfMoves = 0;
let plurality = 'Moves';
let singularity = 'Move';

// applies addEventListener to all cards and adds classes when clicked
for (let x = 0; x < 16; x++) {
  let revealedCards = cards[x]
  revealedCards.addEventListener('click', function(event) {
    revealedCards.classList.add('open');
    revealedCards.classList.add('show');
  })};
// if two cards are clicked that match
document.addEventListener('click', function(e) {
  let targetElement = document.getElementsByClassName('open');
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1])){
    targetElement[0].classList.add('match');
    targetElement[1].classList.add('match');
    if (targetElement[0].classList.contains('match')) {
      numberOfMoves += 1;
      targetElement[0].classList.remove('open');
      targetElement[0].classList.remove('open');
    }
    // updates to either 'move' or 'moves' depending on plurality
    document.getElementById('moves').innerHTML = numberOfMoves;
    if (numberOfMoves === 1){
      document.getElementById('plurality').innerHTML = singularity;
    } else {
      document.getElementById('plurality').innerHTML = plurality;
    };
  }});

// if two cards are clicked that don't match
document.addEventListener('click', function(e) {
  let targetElement = document.getElementsByClassName('open');
  function waitFunction() {
    targetElement[0].classList.remove('show');
    targetElement[1].classList.remove('show');
    targetElement[0].classList.remove('mismatch');
    targetElement[1].classList.remove('mismatch');
    targetElement[0].classList.remove('open');
    targetElement[0].classList.remove('open');
  }
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false){
    setTimeout(waitFunction, 2000);
    targetElement[0].classList.add('show');
    targetElement[1].classList.add('show');
    targetElement[0].classList.add('mismatch');
    targetElement[1].classList.add('mismatch');
  }
  // updates to either 'move' or 'moves' depending on plurality again
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false && targetElement[0].classList.contains('mismatch')) {
    numberOfMoves += 1;
    document.getElementById('moves').innerHTML = numberOfMoves;
    if (numberOfMoves === 1){
      document.getElementById('plurality').innerHTML = singularity;
    } else {
      document.getElementById('plurality').innerHTML = plurality;
    };
  }});
// game completed alert function and event listener
function youDidIt() {
  alert('You did it in ' + numberOfMoves + ' moves!');
};

document.addEventListener('click', function(e) {
  if (document.getElementsByClassName('match').length === 16) {
    setTimeout(youDidIt, 1000);
  }});
