class Game {
  constructor() {
    this.missed = 0;
    this.phraseArray = [
      "abcd efgh",
      "Wxyz"
    ];
    this.phrase = null;
  }

  startGame() {
    this.phrase = this.getRandomPhrase();
    this.phrase.addPhraseToDisplay();
  }

  getRandomPhrase() {
    const idx = Math.floor(Math.random() * this.phraseArray.length)
    return new Phrase(this.phraseArray[idx]);
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
    @return {boolean} true of no letters are hidden, otherwise false
  */
  checkForWin() {
    let won = true;
    $('#phrase .letter').each(function() {
      won = won && ! $(this).attr('class').includes('hide');
    });
    if ( won ) {
      this.gameOver('You guessed the phrase: ' + this.phrase.phraseText);
    }
  }

  removeLife() {
    $('.tries img')[this.missed].setAttribute('src', 'images/lostHeart.png');
    this.missed += 1;
    if ( this.missed === 5 ) {
      this.gameOver('You are out of incorrect guesses'); }
  }

  gameOver(message) {
    $('#game-over-message').text(message);
    $('#overlay').show();
    $('#btn__reset').hide();
    $('#btn__new-game').show();
  }
}
