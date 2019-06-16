import React from 'react';
import Board from './components/Board';
import './css/game.css';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      done: false,
    };
  }
  handleClick(i) {
    if (!this.state.done) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let xIsNext = this.state.xIsNext;
      if (xIsNext) {
        squares[i] = 'X';
        xIsNext = false;
      }
      else {
        squares[i] = 'O';
        xIsNext = true;
      }
      if (calculateWinner(squares)) {
          this.setState({history: history.concat([{ squares: squares}]), stepNumber: history.length,  xIsNext: xIsNext, done: true});
        }
        else {
          const count = squares.filter((x) => {return x !== null}).length;
          if (count === 9) {
            this.setState({history: history.concat([{ squares: squares}]), stepNumber: history.length,  xIsNext: xIsNext, done: true});
          }
          else {
            this.setState({history: history.concat([{ squares: squares}]), stepNumber: history.length,  xIsNext: xIsNext, done: false});
          }
        }
    }
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)
    let status;
if (winner) {
  status = "Winner: " + winner;
}
else {
  const count = current.squares.filter((x) => {return x !== null}).length;
  if (count === 9) {
    status = "This is a draw";
  }
  else {
    status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
  }
}
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to start";
      if (move <= this.state.stepNumber) {
        return (
          <li key={move}>
            <button className="btn btn-primary step" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      }
      return null;
    })
    return (
      <div className="container">
        <div className="game-board">
          <Board squares = {current.squares} onClick = {(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default Game;
