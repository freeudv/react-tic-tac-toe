import React from "react"

function Controls({ isUndo, isRedo, handleUndo, handleRedo }) {
  return (
    <div>
      <button disabled={!isUndo} className="undo-btn btn" onClick={handleUndo}>
        Undo
      </button>
      <button disabled={!isRedo} className="redo-btn btn" onClick={handleRedo}>
        Redo
      </button>
    </div>
  )
}

export default Controls
