var game;

/*
  Start Game button listener
*/
$('#btn__reset').click(function() {
  resetDisplay(event.target);
  game = new Game();
  game.startGame();
});

/*
  New Phrase button listener
*/
$('#btn__new-phrase').click(function() {
  // clear the phrase
  $('#phrase').html('<ul></ul>');
  // reset onscreen keyboard: remove disabled attribute,
  //   remove the classes chosen & wrong
  $('button.key').removeAttr('disabled');
  $('button.key.chosen').removeClass('chosen');
  $('button.key.wrong').removeClass('wrong');
  // reset heart images
  $('.tries img').attr('src', 'images/liveHeart.png');
  $('.tries img').removeClass('lost-heart');
  // re-display the game board
  resetDisplay(event.target);
  game.missed = 0;
  game.startGame();
});

/*
  Display phrase board and keyboard by fading-out overlay
*/
function resetDisplay() {
  $('#overlay').animate(
    { opacity: '0' }, 1000,
    function() {
      $('#overlay').hide();
      game.active = true;
    });
}

/*
  Onscreen keyboard listener
*/
$('#qwerty .key').click(function(event) {
  if ( game.active ) { markButton(event.target); }
});

/*
  Key press listener
    check if key is a-z and not already disabled before marking it
*/
$(document).keypress(function(event) {
  const keyPressed = event.key.toLowerCase();
  if ( game.active && keyPressed >= 'a' && keyPressed <= 'z' ) {
    const key = $('button.key.' + keyPressed);
    if (! key.attr('disabled')) { markButton(key[0]); }
  }
});

/*
  Mark the button as selected and handle the letter
  @param buttonElement {web element} key/button to mark as selected
    assumes the display should be updated and the letter handled
*/
function markButton(buttonElement) {
  buttonElement.disabled = 'true';
  buttonElement.classList.add('chosen');
  game.handleInteraction(buttonElement);
}
