/*
 * Create a list that holds all of your cards
 */
const cardTypes = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
const cards = [...cardTypes, ...cardTypes];
let moveCount = 0;
let moves = document.getElementsByClassName('moves')[0];
let stars = document.getElementsByClassName('stars')[0];
let openedCards = [];
let matchedCards = 0;
const errorDisplayTime = 1000;
const startDisplayTime = 5000;

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
        list.className += 'card open show';
        list.innerHTML = `<i class="fa fa-${card}"></i>`;
        list.addEventListener('click', openCard);
        deck.appendChild(list);
    });


    // Show For a short period of time
    const deckCards = document.getElementsByClassName('card');

    setTimeout(function () {
        for (let i=0; i < deckCards.length; i++) {
            closeCard(deckCards[i]);
        }
    }, startDisplayTime);

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

    // Open the card
    displayCard(card);

    // Add one move
    incrementMove();

    // Add to open card list
    addToOpenCardList(card);

    // Check if the card are same
    if (openedCards.length != 1) {

        // Check opened cards
        const isMatched = checkIfCardsMatch(openedCards);

        if (isMatched) {
            setCardsToMatched(openedCards);

            // Add One Match Card Set
            matchedCards++;
            openedCards = [];

        } else {
            setTimeout(function(){
                closeCards(openedCards);
                openedCards = [];
            }, errorDisplayTime);
        }
    }

    // Game is finished
    if (matchedCards === cardTypes.length) {
        if (confirm(`Congratulation! Your final score is ${moveCount}, want another round?`)) {
            shuffleDeck();
        } else {
            window.close();
        }
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
    card.className = '';
    card.classList.add('card');
    card.classList.add('open');
    card.classList.add('show');

}

function addToOpenCardList(card) {
    if (openedCards.indexOf(card) === -1) {
        openedCards.push(card);
    }
}

function checkIfCardsMatch(openedCards) {

    let cardOneName = getCardName(openedCards[0]);
    let cardTwoName = getCardName(openedCards[1]);

    return cardOneName === cardTwoName;
}

function getCardName(card) {
    return card.firstChild.className.slice(6);
}

function setCardsToMatched(openedCards) {
    for (let i=0 ; i<openedCards.length ; i++) {
        setCardToMatched(openedCards[i]);
        openedCards[i].removeEventListener('click', openCard);
    }
}

function setCardToMatched(card) {
    card.className = '';
    card.classList.add('card');
    card.classList.add('match');
}

function closeCard(card) {
    card.className = '';
    card.classList.add('card');
}

function closeCards(openedCards) {
    for (let i=0 ; i<openedCards.length ; i++) {
        closeCard(openedCards[i]);
    }
}