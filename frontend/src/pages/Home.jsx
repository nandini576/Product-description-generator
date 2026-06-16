import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Hero from '../components/Hero'
import './Home.css'
function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <div className='card-container'>
        <Card title="AI powered" text="Our user-friendly interface allows you to generate product descriptions with just a few clicks." />
        <Card title="E-commerce Ready" text="Optimized for online marketplace.." />
      </div>
      <Footer />
    </>
  )
}

export default Home
