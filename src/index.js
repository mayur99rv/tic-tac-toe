import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const whoWon = (positions, curPos) => {
  const winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winPos.length; i++) {
    const [a, b, c] = winPos[i];
    if (
      positions[a] !== null &&
      positions[a] === positions[b] &&
      positions[a] === positions[c]
    ) {
      return positions[a];
    }
  }
  return null;
};

class Board extends Component {
  renderSquare(i) {
    return (
      <div className="block" onClick={() => this.props.handlerForBoxClick(i)}>
        {this.props.boxes[i] == null ? "" : this.props.boxes[i]}
      </div>
    );
  }
  render() {
    return (
      <>
        <div className="board">
          <div className="title">
            <h1> Game Board</h1>
          </div>
          <div className="content">
            <div className="ttt">
              <div className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class Display extends Component {
  historyHandler = (i) => {
    this.props.changeStep(i);
  };
  render() {
    let gameTitle = "";
    let gameStatus = "";
    if (this.props.stepNumber % 2 === 0) {
      gameTitle = "X's Turn";
    } else gameTitle = "O's Turn";
    if (this.props.gameStatus !== null) {
      gameStatus = this.props.gameStatus + " Won";
      gameTitle = "";
    }
    if (this.props.gameStatus === null && this.props.stepNumber === 9) {
      gameStatus = "Game Draw";
      gameTitle = "";
    }
    return (
      <>
        <div className="display">
          <div className="title">
            <h1> {!!gameStatus ? gameStatus : gameTitle}</h1>
          </div>
          <div className="content">
            <div className="history">
              {this.props.history.map((arr, index) => {
                if (index < this.props.stepNumber) {
                  return (
                    <button onClick={() => this.historyHandler(index)}>
                      goto {index === 0 ? " start " : "step " + index}
                    </button>
                  );
                } else return null;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Board;

class App extends Component {
  // state = {  }
  constructor(props) {
    super(props);

    this.state = {
      history: [Array(9).fill(null)],
      stepNumber: 0,
      gameStatus: null,
    };
  }
  handleSquareClick(i) {
    // alert(i);
    let oldHistory = this.state.history.slice();
    let oldRecord = oldHistory[oldHistory.length - 1];
    if (oldRecord[i] !== null || this.state.gameStatus !== null) {
      alert("Invalid Move");
      return;
    }
    let newRecord = oldRecord.slice();
    newRecord[i] = this.state.stepNumber % 2 === 0 ? "X" : "O";
    let newGameStatus = whoWon(newRecord, i);
    this.setState({
      history: oldHistory.concat([newRecord]),
      stepNumber: this.state.stepNumber + 1,
      gameStatus: newGameStatus,
    });
  }
  render() {
    let squares = this.state.history[this.state.history.length - 1];
    return (
      <>
        <div className="app">
          <Board
            handlerForBoxClick={(i) => this.handleSquareClick(i)}
            boxes={squares}
          />
          <Display
            stepNumber={this.state.stepNumber}
            gameStatus={this.state.gameStatus}
            history={this.state.history}
            changeStep={(i) =>
              this.setState({
                history: this.state.history.slice(0, i + 1),
                stepNumber: i,
                gameStatus: null,
              })
            }
          />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
