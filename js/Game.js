class Game {
  constructor() {
    this.missed = 0;
    this.phraseArray = [
      "May the Force be with you",
      "Mama always said life was like a box of chocolates",
      "Rosebud",
      "I see dead people",
      "Houston we have a problem",
      "bippity boppity boo",
      "I am Groot",
      "Open the pod bay doors HAL",
      "My precious",
      "To infinity and beyond",
      "Of all the gin joints in all the towns in all the world she walks into mine",
      "The dude abides"
    ];
    this.phrase = null;
    this.recentPhraseIndexes = [];
    this.active = false;
  }

  /*
    Transition to phrase/keyboard display
  */
  startGame() {
    this.phrase = this.getRandomPhrase();
    this.phrase.addPhraseToDisplay();
  }

  /*
    return an index in the range of the phrases phraseArray
  */
  randomIndex() {
    return Math.floor(Math.random() * this.phraseArray.length);
  }

  /*
    return a Phrase object with a phrase randomly selected from phrases array
        don't return a phrase that was recently used
  */
  getRandomPhrase() {
    let idx = this.randomIndex();
    // if the game recently used this index then get another
    while ( this.recentPhraseIndexes.includes(idx) ) {
      idx = this.randomIndex();
    }

    // remember no more than half of the indexes in phraseArray
    this.recentPhraseIndexes.push(idx);
    if ( this.recentPhraseIndexes.length > (this.phraseArray.length / 2) ) {
      this.recentPhraseIndexes.shift();
    }

    return new Phrase(this.phraseArray[idx], idx);
  }

  /*
    Handle response to the selected letters
    Call the appropriate method whether or not
      the letter is in the phrase
  */
  handleInteraction(buttonElement) {
    const letter = buttonElement.textContent.toLowerCase();
    if ( this.phrase.checkLetter(letter) ) {
      this.phrase.showMatchedLetter(letter);
      this.checkForWin();
    } else {
      buttonElement.classList.add('wrong');
      this.removeLife()
    }
  }

  /*
    Check that no letters are hidden in the phrase
      if so, end the game with "win" message
  */
  checkForWin() {
    if ( $('#phrase .letter.hide').length === 0 ) {
      this.gameOver('You guessed the phrase: ' + this.phrase.phraseText, true);
    }
  }

  /*
    Transform a live heart image to a lost heart
      also update the missed guesses property.
  */
  removeLife() {
    // update the class on the heart corresponding to the miss
    //   and update the missed guesses property
    $('.tries img')[this.missed].classList.add('lost-heart');
    this.missed += 1;

    // if all hearts are used then display 'lost' message
    //   otherwise transition image lost heart image
    if ( this.missed === 5 ) {
      this.gameOver('You used all of your incorrect guesses', false);
    } else {
      const $lostLives = $('.tries img.lost-heart')
      $lostLives.animate(
        {opacity: '0'}, 500,
        function() {
          $lostLives.attr('src', 'images/lostHeart.png');
          $lostLives.animate( {opacity: '1'}, 500 );
        });
    }

  }

  /*
    Transition to the game over display with the supplied message
      Display the Start Game overlay but with a background based on the
      win/lose result and different button to start the game.
  */
  gameOver(message, won) {
    this.active = false;
    $('#game-over-message').text(message);
    $('#btn__reset').hide();
    $('#btn__new-phrase').show();

    const $overlay = $('#overlay');
    // change background color
    $overlay.addClass( won ? 'win' : 'lose' );
    $overlay.removeClass( !won ? 'win' : 'lose' );
    // fade-in overlay
    $overlay.show();
    $overlay.animate({ opacity: '1'}, 1000 );
  }
}
