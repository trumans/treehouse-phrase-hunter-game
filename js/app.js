var game;

// Start Game button
$('#btn__reset').click(function() {
  resetDisplay(event.target);
  game = new Game();
  game.startGame();
});

// Reset Game button
$('#btn__new-phrase').click(function() {
  // clear the phrase
  $('#phrase').html('<ul></ul>');
  // reset onscreen keyboard: remove disabled attribute,
  //   remove the classes chosen & wrong
  $('button.key').removeAttr('disabled');
  $('button.key').removeClass('chosen');
  $('button.key').removeClass('wrong');
  // reset heart images
  $('.tries img').attr('src', 'images/liveHeart.png');
  // re-display the game board
  resetDisplay(event.target);
  game.missed = 0;
  game.startGame();
});

// Display phrase board and keyboard
//  reset phrase, onscreen keyboard, tries if New Game button clicked
function resetDisplay() {
  $('#overlay').hide();
}

// Create onscreen keyboard listener
$('#qwerty').click(function(event) {
  if ( event.target.tagName === 'BUTTON' ) {
    markButton(event.target);
  }
});

// Create key press listener
$(document).keypress(function(event) {
  const keyPressed = event.key.toLowerCase();
  if (keyPressed >= 'a' && keyPressed <= 'z') {
    $('button.key').each(function() {
      // mark the key button if it is the key pressed
      //   and the button is not already disabled.
      if ( $(this).text() === keyPressed &&
           ! $(this).attr('disabled') ) {
        markButton($(this)[0]);
      }
    });
  }
});

// mark the button that was selected
function markButton(buttonElement) {
  buttonElement.disabled = 'true';
  buttonElement.classList.add('chosen');
  game.handleInteraction(buttonElement);
}
