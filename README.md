Bugs:
- Instafall delays death
- Rotation origin (super rotation system, https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris)
- Reset tick after last-minute rotate
- Game drawing clock (event loop? investigate)
- Gridlines as gutter in grid

Features:
- Better 'Game Over' screen.
- UI
- Stats
- Localstorage highscores
- Cool effect on line clear, extra effect on Tetris

Maintenance:
- Move collision logic to block class

Future:
- 2 player mode (one client)
- Backend for highscores (rpi or firebase)

Maybe:
- Snake/Pacman style level overflow
- "Tetris UI", select mode by dropping block in a column
- Swap out Parceljs (https://2020.stateofjs.com/en-US/technologies/build-tools/)
- Implement 8bit style wordart