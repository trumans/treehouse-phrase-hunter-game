class Game {
  constructor() {
    this.missed = 0;
    this.phraseArray = [
      "abc def ghi j",
      "abc def ghi", "abc def gh", "abc def g",
      "abc def", "abc de", "abc d",
      "abc", "ab", "a",
    ];
    this.phrase = null;
    this.recentPhraseIndexes = [];
    this.active = false;
  }

  startGame() {
    this.phrase = this.getRandomPhrase();
    this.phrase.addPhraseToDisplay();
  }

  randomIndex() {
    return Math.floor(Math.random() * this.phraseArray.length);
  }

  getRandomPhrase() {
    let idx = this.randomIndex();
    // if game already used this index then get another
    while ( this.recentPhraseIndexes.includes(idx) ) {
      idx = this.randomIndex();
    }

    // rmemember no more than half of the indexes in phraseArray
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
      if so, end the game
  */
  checkForWin() {
    if ( $('#phrase .letter.hide').length === 0 ) {
      this.gameOver('You guessed the phrase: ' + this.phrase.phraseText, true);
    }
  }

  removeLife() {
    // update the heart corresponding to the miss
    $('.tries img')[this.missed].classList.add('lost-heart');
    this.missed += 1;

    // if all hearts are used then display 'lost' message
    //   otherwise transition lost to lost heart image
    if ( this.missed === 5 ) {
      this.gameOver('You are out of incorrect guesses', false);
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

  // Display game over message
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
