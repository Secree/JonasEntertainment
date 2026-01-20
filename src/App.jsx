import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Music from './pages/Music'
import Games from './pages/Games'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">◄ JONAS ENTERTAINMENT ►</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/music">Music</Link></li>
              <li><Link to="/games">Games</Link></li>
            </ul>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; 2026 Jonas Entertainment. Made with ❤️</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
