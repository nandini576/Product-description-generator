import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
function Navbar() {
  return (
    <nav className='navbar'>
      <h1>Product Description Generator</h1>
      <div className='links'>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar

