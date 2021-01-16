Bugs:
- Conditionally disallow rotate
- Reset tick after instafall
- Instafall delays death
- Rotation origin (super rotation system, https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris)
- Reset tick after last-minute rotate
- Game drawing clock (event loop? investigate)
- Gridlines as gutter in grid

Features:
- UI
- Stats
- Localstorage highscores

Maintenance:
- remove Constants, give 'stage' to block as arg

Future:
- 2 player mode (one client)
- Backend for highscores (rpi or firebase)

Maybe:
- Snake/Pacman style level overflow
- "Tetris UI", select mode by dropping block in a column
- Swap out Parceljs (https://2020.stateofjs.com/en-US/technologies/build-tools/)