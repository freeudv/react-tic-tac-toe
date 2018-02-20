import React, { Fragment } from "react"

function ResultHeader({ winner, step, xTurn, onClick }) {
  let result = ""

  if (winner) {
    switch (winner) {
      case "ch":
        result = "Crosses won!"
        break
      case "ri":
        result = "Toes won!"
        break
      default:
        result = "It's a draw!"
    }
  }

  return (
    <div className="won-title">
      {winner ? (
        <Fragment>
          <span className="won-message">{result}</span>
          <button className="restart-btn btn" onClick={onClick}>
            Restart game
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div className="won-turn">{xTurn ? "X turn" : "O turn"}</div>
          <div>Steps: {step}</div>
        </Fragment>
      )}
    </div>
  )
}

export default ResultHeader
