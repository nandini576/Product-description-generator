import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './DashBoard.css'

function DashBoard() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="page">
        <h1>Dashboard</h1>
        <p>Dashboard content coming soon...</p>
      </main>

      <Footer />
    </div>
  )
}

export default DashBoard