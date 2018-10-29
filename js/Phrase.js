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

  checkLetter(letter) {
    return this.phraseLowerCase.includes(letter);
  }

  showMatchedLetter(letter) {
    $(`#phrase .letter.${letter}`).toggleClass('show hide');
  }
}
