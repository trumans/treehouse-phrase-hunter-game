class Phrase {
  constructor(phraseText) {
    this.phraseText = phraseText;
    this.phraseLowerCase = phraseText.toLowerCase();
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
