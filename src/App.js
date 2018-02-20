import React, { Component, Fragment } from "react"
import Field from "./Field"
import ResultHeader from "./ResultHeader"
import Controls from "./Controls"

import { calculateWinner } from "./helpers"

const initialState = {
  xTurn: true,
  winner: null,
  history: [],
  current: 0
}

class App extends Component {
  state = { ...initialState }

  handleCellClick = i => {
    const { history, xTurn, winner, current } = this.state

    const currentHistory = history.slice(0, current)
    const className = xTurn ? "ch" : "ri"

    //    const notEmpty = history.find(item => item.cell === i)
    const notEmpty = currentHistory.map(({ cell }) => cell).includes(i)

    if (winner || notEmpty) {
      return
    }

    currentHistory.push({ cell: i, fill: className })

    let isWinner = calculateWinner(currentHistory)

    if (isWinner && Array.isArray(isWinner)) {
      const [winnerClassName, ...winnerCells] = isWinner

      winnerCells.forEach(cellNumber => {
        currentHistory.forEach(item => {
          if (item.cell === cellNumber) {
            item.fill += ` ${winnerClassName}`
          }
        })
      })

      isWinner = currentHistory
        .find(({ cell }) => cell === isWinner[1])
        .fill.split(" ")[0]
    }

    this.setState(({ xTurn }) => ({
      history: currentHistory,
      winner: isWinner,
      xTurn: !xTurn,
      current: currentHistory.length
    }))
  }

  handleUndo = () => {
    let { winner } = this.state

    let history = this.state.history.slice()

    if (winner) {
      history = history.map(item => ({
        ...item,
        fill: item.fill.slice(0, 2)
      }))
    }

    this.setState(({ xTurn, current }) => ({
      history,
      xTurn: !xTurn,
      winner: null,
      current: current - 1
    }))
  }

  handleRedo = () => {
    const currentHistory = this.state.history.slice(0, this.state.current + 1)

    let isWinner = calculateWinner(currentHistory)

    if (isWinner && Array.isArray(isWinner)) {
      const [winnerClassName, ...winnerCells] = isWinner

      winnerCells.forEach(cellNumber => {
        currentHistory.forEach(item => {
          if (item.cell === cellNumber) {
            item.fill += ` ${winnerClassName}`
          }
        })
      })

      isWinner = currentHistory
        .find(({ cell }) => cell === isWinner[1])
        .fill.split(" ")[0]
    }

    this.setState(({ xTurn, current }) => ({
      xTurn: !xTurn,
      winner: isWinner,
      current: current + 1
    }))
  }

  handleRestart = () => {
    this.setState({ ...initialState })
  }

  render() {
    const { winner, history, xTurn, current } = this.state

    console.log("history", history)
    console.log("current", history.slice(0, current))
    return (
      <Fragment>
        <ResultHeader
          winner={winner}
          onClick={this.handleRestart}
          step={history.slice(0, current).length}
          xTurn={xTurn}
        />
        <Field
          history={history.slice(0, current)}
          onClick={this.handleCellClick}
        />
        <Controls
          isUndo={current > 0}
          isRedo={history.length > current}
          handleUndo={this.handleUndo}
          handleRedo={this.handleRedo}
        />
      </Fragment>
    )
  }
}

export default App
