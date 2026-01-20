import React, { useState } from 'react'
import TicTacToe from '../components/TicTacToe'
import MemoryGame from '../components/MemoryGame'
import SnakeGame from '../components/SnakeGame'
import './Games.css'

function Games() {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: '❌⭕', component: TicTacToe },
    { id: 'memory', name: 'Memory Game', icon: '🃏', component: MemoryGame },
    { id: 'snake', name: 'Snake Game', icon: '🐍', component: SnakeGame },
  ]

  return (
    <div className="games-page">
      <h1>Games</h1>
      
      {!selectedGame ? (
        <div className="game-selection">
          {games.map((game) => (
            <div
              key={game.id}
              className="game-card"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="game-icon">{game.icon}</div>
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="game-container">
          <button className="back-btn" onClick={() => setSelectedGame(null)}>
            ← Back to Games
          </button>
          {games.find(g => g.id === selectedGame)?.component && 
            React.createElement(games.find(g => g.id === selectedGame).component)
          }
        </div>
      )}
    </div>
  )
}

export default Games
