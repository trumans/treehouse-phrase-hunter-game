
# Basic rules of the game #

The player’s goal is to guess all the letters in a hidden random phrase. At the beginning, the player only sees the number of letters and words in the phrase, represented by blank boxes on the screen.

To guess a letter the player either mouse clicks an on-screen keyboard or selects the key from computer keyboard. If the selected letter is in the phrase, all of its positions in the phrase are displayed and it is highlighted in green on the keyboard. If the letter is not in the phrase, one of the player's remaining hearts changes to gray and it is highlighted in red on the keyboard.

The player keeps choosing letters until they reveal all the letters in the phrase, or they make 5 incorrect guesses.


# JavaScript files #

## Game.js (Game class) ##

Primary properties:
- array of phrases to select from
- current state of the game
- array of recently used phrases

Primary methods:
- Transition display to Phrase/Keyboard display.
- Transition display to Game Over display.
- Handle a user selected letter and call the appropriate functions to update the display.

## Phrase.js (Phrase class) ##

Primary properties:
- the current phrase

Primary methods:
- display the appropriate number of blanks and spaces for a new phrase.
- check if a letter is in the phrase.
- reveal the selected letter in the phrase display.

## app.js ##

Create listeners:
- Start Game button: display the first empty phrase.
- New Phrase button: reset the board and display a new empty phrase.
- Onscreen keyboard keys: mark a key as selected.
- Computer key presses: mark the corresponding onscreen key as selected if key is alphabetic and not previously selected.

Primary functions:
- Mark a key as selected and call Game method to handle it.


# Additional comments about functionality #

The game fades to the phrase/keyboard display and to the game over display using jQuery animation.

Mouse hovering on the onscreen keyboard expands the key.

Letters can be selected from the computer keyboard or onscreen keyboard by mouse. The game accepts uppercase and lowercase letters.

Phrases may contain uppercase letters, but the user does not need to guess the case of the letter for a match.

When the phrase/keyboard display is not active any keyboard presses are ignored. The same for mouse clicks over the onscreen display area.

When a letter is correctly guessed the background color on the phrase board transitions to blue using CSS animation

When a letter is incorrectly guessed the blue heart transitions to a gray heart using jQuery animation.

When a new phrase is randomly selected the last X displayed phrases are not reused. The number X is one-half of the phrases in the phrase array.
