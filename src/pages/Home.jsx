import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Welcome to Jonas Entertainment</h1>
        <p className="hero-subtitle">Your ultimate destination for music and games</p>
        <p className="hero-cta">👆 Click Music or Games above to get started! 👆</p>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Music Player</h3>
            <p>Listen to your favorite tracks with our sleek music player</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Games</h3>
            <p>Play fun and addictive games right in your browser</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Entertainment</h3>
            <p>All your entertainment needs in one place</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
