WIP: 
- Touch/gesture controls -> 70%
- Highscores -> 40%

Bugs:
- Reset tick after last-minute rotate
- SVG 'next' viewbox

Features:
- Better 'Game Over' screen. (in progress)
- See highscore list
- Submit names with highscore
- UI
  - Responsive position
  - Check gameboy version for inspiration, or this one: https://m.media-amazon.com/images/S/aplus-media/vc/d2044fc9-3049-41ff-8262-6b52fad2794c.__CR0,69,2099,2099_PT0_SX300_V1___.jpg
  - Lines
  - Level
- Cool effect on line clear, extra effect on Tetris
- Show block shadow
- Rotation origin (super rotation system, https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris)
- Drought, blocks since tallblock (Joost)
- 'Record pace' notifications (Erik v R)


Maintenance:
- Move collision logic to block class
- Gridlines as gutter in grid

Future:
- 2 player mode (one client)
- Backend for highscores (rpi or firebase)
- Validate highscore by saving game history (Erik S)
- Touchscreen support through hammer.js
- Stats
- Sound
- DIY Analytics
- Idea credits

Maybe:
- Game drawing clock (event loop? investigate) -> disable hold instafall/rotate, hold left/right same speed for everyone
- Snake/Pacman style level overflow
- "Tetris UI", select mode by dropping block in a column
- Swap out Parceljs -> snowpack (https://2020.stateofjs.com/en-US/technologies/build-tools/)
- Implement 8bit style wordart
- Change d3 for either native JS or Preact

On release:
- Post to reddit.com/r/tetris (as video) "I wrote a Tetris clone with co-op mode"
- Write blog post
- Ask Daniel to hack the highscore


Project started at around 5 januari