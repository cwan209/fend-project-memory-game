/*
 * Create a list that holds all of your cards
 */
const cardTypes = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
const cards = [...cardTypes, ...cardTypes];
let moveCount = 0;
let moves = document.getElementsByClassName('moves')[0];
let stars = document.getElementsByClassName('stars')[0];
let oneCardFlipped = false;
let lastOpenedCard;
let openedCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let deck = document.getElementsByClassName('deck')[0];

function shuffleDeck() {

    // Reset Move Count
    moveCount = 0;
    moves.innerHTML = moveCount;

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
        list.addEventListener('click', openCard);
        deck.appendChild(list);
    });
}

shuffleDeck();

/*
    Click Restart to shuffle the deck
 */
let restartButton = document.getElementsByClassName('restart')[0];
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
function openCard(event) {

    let card = event.target;
    const cardName = card.firstChild.className.slice(6);

    let lastCardName;
    if (lastOpenedCard) {
        lastCardName = lastOpenedCard.firstChild.className.slice(6);
    }

    // Open the card
    displayCard();

    // Add one move
    incrementMove();

    // Add to open card list
    addToOpenCardList(card);

    // Check if the card are same
    if (openedCards.contains(card)) {
        // Reset Both Cards
        card.classList.remove('open');
        card.classList.remove('show');

        lastOpenedCard.classList.remove('open');
        lastOpenedCard.classList.remove('show');

        // Two cards match
        if (lastCardName === cardName) {
            card.classList.add('match');
            lastOpenedCard.classList.add('match');

            matchedCards.push(cardName);

            // Remove event listener
            lastOpenedCard.removeEventListener('click', openCard);
            card.removeEventListener('click', openCard);

        } else {
            // Nothing for now
            console.log('wrong match');
        }
    }

    // Game is finished
    if (matchedCards.length === cardTypes.length) {
        console.log("Win");
    }
}

function setStars(moveCount) {
    let starNumber = 0;
    const threeStarThreshold = 30;
    const twoStarthreshold = 60;

    if (moveCount < threeStarThreshold) {
        starNumber = 3;
    } else if (moveCount >= threeStarThreshold && moveCount < twoStarthreshold) {
        starNumber = 2;
    } else {
        starNumber = 1;
    }

    // Set stars
    stars.innerHTML = '';
    for (let i = 0; i < starNumber; i++) {
        let list = document.createElement('li');
        list.innerHTML = '<i class="fa fa-star"></i>';
        stars.appendChild(list);
    }

}

function incrementMove(){
    moveCount++;
    moves.innerHTML = moveCount;
    setStars(moveCount);
}

function displayCard(card) {
    if (!card.classList.contains('open')) {
        card.classList.add('open');
        card.classList.add('show');
    }
}

function addToOpenCardList(card) {
    openedCards.push(card);
}