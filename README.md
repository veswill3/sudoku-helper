# Sudoku Visual Helper

Visually show remaining possibilities while solving a sudoku puzzle. This is not a solver, it just helps to quickly review the board.

### TODO

- [ ] User should be able to enter a new puzzle instead of it being hardcoded.
- [ ] Each attempted change should run a validation and either display an issue or refuse to update a cell.
- [ ] Catching key presses is a little aggressive at the moment (F5 does not refresh, cant open dev console).

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

probably just don't use this

### `npm run deploy`

builds and pushes a new gh-pages branch to update the live site
