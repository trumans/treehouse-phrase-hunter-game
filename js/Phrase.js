class Phrase {
  /*
    @param phraseText {string} the phrase found in phrase array
    @param index      {index}  the index of the phrase in the phrase array

    phraseLowerCase {string} the phrase converted to lowercase. used in searches
  */
  constructor(phraseText, index) {
    this.phraseText = phraseText;
    this.phraseLowerCase = phraseText.toLowerCase();
    this.index = index;
  }

  /*
    Display the blanks and spaces for a new phrase
  */
  addPhraseToDisplay() {
    const $ul = $('#phrase');
    let charElement;
    for ( let char of this.phraseText ) {
      if ( char === ' ' ) {
        $ul.append( $(`<li class="hide space"> </li>`) );
      } else {
        $ul.append( $(`<li class="hide letter ${char.toLowerCase()}">${char}</li>`) );
      }
    }
  }

  /*
    Check if a letter is in the phrase
    @param letter {string} assumed to be one letter
    @return {boolean} true if the letter is in the phrase, case insensitive
      otherwise false
  */
  checkLetter(letter) {
    return this.phraseLowerCase.includes(letter);
  }

  /*
    Display all occurences of a letter in the phrase
    @param letter {string} assumed to a a letter in the phrase
  */
  showMatchedLetter(letter) {
    $(`#phrase .letter.${letter}`).toggleClass('show hide');
  }
}
