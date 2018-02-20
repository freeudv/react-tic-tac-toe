export function calculateWinner(history) {
  const lines = [
    [0, 1, 2, "win horizontal"],
    [3, 4, 5, "win horizontal"],
    [6, 7, 8, "win horizontal"],
    [0, 3, 6, "win vertical"],
    [1, 4, 7, "win vertical"],
    [2, 5, 8, "win vertical"],
    [0, 4, 8, "win diagonal-right"],
    [2, 4, 6, "win diagonal-left"]
  ]

  let cells = []

  history.forEach(item => {
    cells[item.cell] = item.fill
  })

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return lines[i].reverse()
    }
  }

  if (cells.filter(cell => cell).length >= 9) {
    return "draw"
  }

  return null
}
