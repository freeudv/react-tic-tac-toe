import React, { Component } from "react"
import Cell from "./Cell"

export const ROWS_COUNT = 3
export const COLS_COUNT = 3

export default class Field extends Component {
  generateRows = (rowsCount, colsCount) => {
    let rows = []
    for (let i = 0; i < rowsCount; i++) {
      const row = (
        <div className="row" key={i}>
          {this.generateCols(colsCount, i)}
        </div>
      )
      rows.push(row)
    }

    return rows
  }

  generateCols = (colsCount, rowId) => {
    let cells = []
    for (let i = 0; i < colsCount; i++) {
      const id = rowId * 3 + i
      const notEmpty = this.props.history.find(item => item.cell === id)
      const cell = (
        <Cell
          key={id}
          className={notEmpty ? ` ${notEmpty.fill}` : ""}
          onClick={() => this.props.onClick(id)}
        />
      )

      cells.push(cell)
    }

    return cells
  }

  render() {
    return (
      <div className="field">{this.generateRows(ROWS_COUNT, COLS_COUNT)}</div>
    )
  }
}
