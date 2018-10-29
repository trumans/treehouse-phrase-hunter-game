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
    $('#btn__new-phrase').show();
  }
}
