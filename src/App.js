import React, { Component } from 'react';

// split into rows and columns and convert to number
const string2board = (str) => str.match(/.{1,9}/g).map(row => row.split('').map(Number));

class App extends Component {
  constructor() {
    super();
    this.state = {
      // board: [
      //   [0,0,0,3,0,0,0,0,0],
      //   [1,0,0,5,0,0,0,2,0],
      //   [0,0,6,0,0,0,7,9,0],
      //   [4,0,0,0,0,0,0,7,0],
      //   [0,2,7,0,0,0,8,0,0],
      //   [5,0,3,0,8,0,0,4,9],
      //   [0,0,0,0,7,0,0,0,0],
      //   [8,0,0,0,6,0,1,0,0],
      //   [0,0,4,0,0,1,0,3,0]
      // ],
      board: string2board('000300000100500020006000790400000070027000800503080049000070000800060100004001030'),
      selected: 0,
      editBoard: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (e) => {
    // right arrow or space
    if (e.keyCode === 39 || e.keyCode === 32) {
      this.updateHighlight(++this.state.selected);
      e.preventDefault();
    } else if (e.keyCode === 37) { // left arrow
      this.updateHighlight(--this.state.selected);
      e.preventDefault();
    }
  }

  handleClick(r, c) {
    let newBoard = this.state.board.map(function(row) {
      return row.slice();
    });
    newBoard[r][c] = this.state.selected;
    this.setState({board: newBoard});
  }

  renderCell(heightlightObj, r, c) {
    if (this.state.editBoard) {
      return (
        <td>
          <input
            type="numberic"
            maxLength={1}
            size={1}
            value={this.state.board[r][c] ? this.state.board[r][c] : ''}
            onChange={e => {
              const board = [...this.state.board];
              board[r] = [...this.state.board[r]];
              board[r][c] = e.target.value;
              this.setState({ board });
            }}
          />
        </td>
      );
    }
    let classes = [];
    if (heightlightObj && heightlightObj[r + ':' + c]) {
      classes.push("highlight");
    }
    if (this.state.selected === this.state.board[r][c]) {
      classes.push("selected");
    }
    return (
      <td className={classes.join(" ")}
          onClick={() => this.handleClick(r, c)}>
        {this.state.board[r][c] ? this.state.board[r][c] : " "}
      </td>
    );
  }

  renderRow(heightlightObj, r) {
    return (
      <tr>
        {this.renderCell(heightlightObj, r, 0)}
        {this.renderCell(heightlightObj, r, 1)}
        {this.renderCell(heightlightObj, r, 2)}
        {this.renderCell(heightlightObj, r, 3)}
        {this.renderCell(heightlightObj, r, 4)}
        {this.renderCell(heightlightObj, r, 5)}
        {this.renderCell(heightlightObj, r, 6)}
        {this.renderCell(heightlightObj, r, 7)}
        {this.renderCell(heightlightObj, r, 8)}
      </tr>
    );
  }

  updateHighlight(val) {
    if (val > 9) {
      val = 0;
    }
    this.setState({selected: val});
  }

  render() {
    let toHighlight = {};
    if (this.state.selected) {
      for (let r = 0; r < this.state.board.length; r++) {
        for (let c = 0; c < this.state.board[r].length; c++) {
          if (this.state.board[r][c]) {
            toHighlight[r + ':' + c] = true;
          }
          if (this.state.board[r][c] === this.state.selected) {
            // highlight row
            for (let col = 0; col < 9; col++) {
              toHighlight[r + ':' + col] = true;
            }
            // highlight column
            for (let row = 0; row < 9; row++) {
              toHighlight[row + ':' + c] = true;
            }
            // highlight group
            let gR = 0;
            if (r > 5) {
              gR = 6;
            } else if (r > 2) {
              gR = 3;
            }
            let gC = 0;
            if (c > 5) {
              gC = 6;
            } else if (c > 2) {
              gC = 3;
            }
            for (var xR = gR + 2; xR >= gR; xR--) {
              for (var xC = gC + 2; xC >= gC; xC--) {
                toHighlight[xR + ':' + xC] = true;
              }
            }
          }
        }
      }
    }

    return (
      <div>
        <h2>Sudoku visual helper</h2>
        <p>
          Visually show remaining possibilities while solving a sudoku puzzle.
          This is not a solver, it just helps to quickly review the board.
          To toggle the table editor&nbsp;
          <span
            className="edit-link"
            onClick={() => this.setState({ editBoard: !this.state.editBoard })}
          >
            Click here
          </span>
        </p>
        <table>
          <tbody>
            {this.renderRow(toHighlight, 0)}
            {this.renderRow(toHighlight, 1)}
            {this.renderRow(toHighlight, 2)}
            {this.renderRow(toHighlight, 3)}
            {this.renderRow(toHighlight, 4)}
            {this.renderRow(toHighlight, 5)}
            {this.renderRow(toHighlight, 6)}
            {this.renderRow(toHighlight, 7)}
            {this.renderRow(toHighlight, 8)}
          </tbody>
        </table>
        <div className="buttons">
          <button onClick={() => this.updateHighlight(0)}>C</button>
          <button onClick={() => this.updateHighlight(1)}>1</button>
          <button onClick={() => this.updateHighlight(2)}>2</button>
          <button onClick={() => this.updateHighlight(3)}>3</button>
          <button onClick={() => this.updateHighlight(4)}>4</button>
          <button onClick={() => this.updateHighlight(5)}>5</button>
          <button onClick={() => this.updateHighlight(6)}>6</button>
          <button onClick={() => this.updateHighlight(7)}>7</button>
          <button onClick={() => this.updateHighlight(8)}>8</button>
          <button onClick={() => this.updateHighlight(9)}>9</button>
          <button onClick={() => this.updateHighlight(++this.state.selected)}>+</button>
        </div>
        <p>
          Click a number below to show it's availible slots. Click any slot to insert that number.
          Cylce through numbers with the [+] button, spacebar, or left/right arrows.
        </p>
      </div>
    );
  }
}

export default App;
