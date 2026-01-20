import React, { useState, useEffect, useCallback } from 'react'
import './SnakeGame.css'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood())
    setIsGameOver(false)
    setIsPlaying(true)
    setScore(0)
  }

  const checkCollision = (head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    
    // Self collision
    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return true
      }
    }
    
    return false
  }

  const moveSnake = useCallback(() => {
    if (!isPlaying || isGameOver) return

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] }
      head.x += direction.x
      head.y += direction.y

      if (checkCollision(head)) {
        setIsGameOver(true)
        setIsPlaying(false)
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood())
        setScore((s) => s + 10)
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, isPlaying, isGameOver, generateFood])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const gameLoop = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameLoop)
  }, [moveSnake, isPlaying])

  return (
    <div className="snake-game">
      <h2>Snake Game</h2>
      
      <div className="game-info">
        <p>Score: {score}</p>
        <p>Length: {snake.length}</p>
      </div>

      {isGameOver && (
        <div className="game-over">
          Game Over! Final Score: {score}
        </div>
      )}

      <div 
        className="snake-grid"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      </div>

      <div className="game-controls">
        {!isPlaying && !isGameOver && (
          <button className="start-btn" onClick={() => setIsPlaying(true)}>
            Start Game
          </button>
        )}
        {(isGameOver || isPlaying) && (
          <button className="reset-btn" onClick={resetGame}>
            Reset Game
          </button>
        )}
      </div>

      <div className="instructions">
        <p>Use arrow keys to control the snake</p>
      </div>
    </div>
  )
}

export default SnakeGame
