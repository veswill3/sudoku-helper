Sudoku Visual Helper
====================

Visually show remaining possibilities while solving a sudoku puzzle. This is **not** a solver, it just helps to quickly review the board.

![Filtering possibilities](screenshot.png?raw=true "Filtering possibilities")

### TODO

- [ ] Each attempted change should run a validation and either display an issue or refuse to update a cell.
- [ ] User should be able to enter a new puzzle instead of it being hardcoded.
- [X] Catching key presses is a little aggressive at the moment (F5 does not refresh, cant open dev console).
  - fix: only prevent default for the keys we care about
