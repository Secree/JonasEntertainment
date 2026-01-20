import React, { useState, useEffect } from 'react'
import './MemoryGame.css'

const emojis = ['🎮', '🎵', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸']

function MemoryGame() {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false }))
    
    setCards(gameCards)
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setIsWon(false)
  }

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].emoji)
    ) {
      return
    }

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatchedPairs([...matchedPairs, cards[first].emoji])
        setFlippedIndices([])
        
        if (matchedPairs.length + 1 === emojis.length) {
          setIsWon(true)
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000)
      }
    }
  }

  return (
    <div className="memory-game">
      <h2>Memory Game</h2>
      
      <div className="game-info">
        <p>Moves: {moves}</p>
        <p>Pairs Found: {matchedPairs.length}/{emojis.length}</p>
      </div>

      {isWon && (
        <div className="win-message">
          🎉 You Won in {moves} moves!
        </div>
      )}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${
              flippedIndices.includes(index) || matchedPairs.includes(card.emoji)
                ? 'flipped'
                : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.emoji}</div>
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={initializeGame}>
        New Game
      </button>
    </div>
  )
}

export default MemoryGame
