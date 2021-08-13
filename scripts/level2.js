/*Script for level 2: Flags

Things we need:

- Keep track of currently flipped cards
- Check if those cards match
- Decrease lives if they do not match
- If they do not match, flip the cards back down
*/

function sleep(milliseconds=500) {
  // Sleep function to delay secondary card flip
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function resetCards() {
  const cards = $(".card");
  shuffleCards(cards);
  $(".card").remove();
  for (let i = 0; i < cards.length; i++) {
    $(".game-container-level2").append($(cards[i].outerHTML));
  }
}

function startTimer(gameState) {
  let timer = setInterval(function () {
    let currentTime = parseInt($("#time-remaining").text());
    if (gameState.correctMatches == 10) {
      gameState.displayGameTransition("victory", 3500);
			  $(".transitionToLevel3").show();
      clearInterval(timer);
    }
    if (currentTime == 0) {
      clearInterval(timer);
      $("#time-remaining").text("0");
      if (gameState.correctMatches < 10) {
        gameState.displayGameTransition("failure", 3500);
        $(".tryAgainLevel2").show();
      }
    } else {
      $("#time-remaining").text(`${--currentTime}`);
    }
  }, 1000);
}


const gameState = {
  currentFlippedCards: [],
  correctMatches: 0,
  checkFlippedCards: function() {
    if (this.currentFlippedCards.length == 2) {
      let firstCard = this.currentFlippedCards[0].split("-")[0];
      let secondCard = this.currentFlippedCards[1].split("-")[0];
      return firstCard == secondCard;
    } else {
      return null;
    }
  },
  resetFlippedCards: function() {
    $(`#${this.currentFlippedCards[0]}`).flip(false);
    $(`#${this.currentFlippedCards[1]}`).flip(false);
    // Necessary to allow users who click to fast to still see the second card
    sleep(200);
  },
  disableCorrectCards: function() {
    $(`#${this.currentFlippedCards[0]}`).off("click");
    $(`#${this.currentFlippedCards[1]}`).off("click");
  },
  displayGameTransition: function(imageClass, duration) {
    $(".card").hide();
    $(".game-transition").show();
    $(`.${imageClass}`).show();
    let audio = new Audio(`/sounds/${imageClass}.mp3`);
    audio.volume = 0.3;
    if (imageClass == "start-game") {
      setTimeout(function () {audio.play();}, 1000);
    } else {
      audio.play();
    }
    setTimeout(function () {
      $(".game-transition").hide();
      $(`.${imageClass}`).hide();
      $(".card").show();
    }, duration);
  }

};

$(document).ready(function() {
  resetCards();
  // Visual bug, cards need to be clicked twice to start toggle
  $(".card").flip();
    gameState.displayGameTransition("start-game", 3500);
    setTimeout(function () {
    startTimer(gameState);
  }, 3500);
  $(".card").click(function () {
    // Keep track of currently flipped cards
    if (gameState.currentFlippedCards.length < 2) {
      let cardID = $(this).attr("id");
      gameState.currentFlippedCards.push(cardID);
    }
    // Only flip cards up, if they match they will stay flipped up
    // If they don't match, they'll get flipped back down
    $(this).flip(true);
    // This code only runs when the flip animation ends
    $(this).on("flip:done", function () {
      // We only compare cards if we have a pair (2), else this blockdoes not run
      if (gameState.currentFlippedCards.length == 2) {
        if (gameState.checkFlippedCards() == true) {
          gameState.disableCorrectCards();
          gameState.correctMatches += 1;
          $("#correct-pairs").text(`${gameState.correctMatches}/10`);
        } else if (gameState.checkFlippedCards() == false) {
          gameState.resetFlippedCards();
        }
        gameState.currentFlippedCards = [];
      }
    });
  });
});