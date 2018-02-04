/*
 * Create a list that holds all of your cards
 */
const cardTypes = ['dimond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
const cards = [...cardTypes, ...cardTypes];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let deck = document.getElementsByClassName('deck')[0];

function shuffleDeck() {

    // Clear the deck
    while (deck.firstChild) {
        deck.firstChild.remove();
    }

    // Populate the deck
    let shuffledCards = shuffle(cards);
    shuffledCards.forEach(function (card) {
        let list = document.createElement('li');
        list.className += 'card';
        list.innerHTML = `<i class="fa fa-${card}"></i>`;
        deck.appendChild(list);
    });
}

shuffleDeck();

/*
    Click Restart to shuffle the deck
 */
let restartButton = document.getElementsByClassName('restart')[0];
console.log(restartButton);
restartButton.addEventListener('click', shuffleDeck);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
