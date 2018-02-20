import React from "react"

const Cell = ({ onClick, className }) => {
  return <div className={`cell${className}`} onClick={onClick} />
}

export default Cell
