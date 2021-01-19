Bugs:
- Instafall delays death
- Rotation origin (super rotation system, https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris)
- Reset tick after last-minute rotate
- Gridlines as gutter in grid

Features:
- Better 'Game Over' screen. (in progress)
- UI 
  - Check gameboy version for inspiration, or this one: https://m.media-amazon.com/images/S/aplus-media/vc/d2044fc9-3049-41ff-8262-6b52fad2794c.__CR0,69,2099,2099_PT0_SX300_V1___.jpg
  - Next
  - Score [Done]
  - Lines
  - Level
- Highscores
- Cool effect on line clear, extra effect on Tetris
- Show block shadow
- Drought, blocks since tallblock

Maintenance:
- Move collision logic to block class

Future:
- 2 player mode (one client)
- Backend for highscores (rpi or firebase)
- Touchscreen support through hammer.js
- Stats
- Sound

Maybe:
- Game drawing clock (event loop? investigate)
- Snake/Pacman style level overflow
- "Tetris UI", select mode by dropping block in a column
- Swap out Parceljs (https://2020.stateofjs.com/en-US/technologies/build-tools/)
- Implement 8bit style wordart