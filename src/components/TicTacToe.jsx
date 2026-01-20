import React, { useState } from 'react'
import './TicTacToe.css'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || winner) return
    
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    
    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    }
    
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const isBoardFull = board.every(cell => cell !== null)

  return (
    <div className="tictactoe">
      <h2>Tic Tac Toe</h2>
      
      <div className="game-status">
        {winner ? (
          <p className="winner">🎉 Winner: {winner}</p>
        ) : isBoardFull ? (
          <p className="draw">It's a Draw!</p>
        ) : (
          <p>Next Player: {isXNext ? 'X' : 'O'}</p>
        )}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  )
}

export default TicTacToe
