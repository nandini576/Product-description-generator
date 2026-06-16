import React from 'react'
import "./Card.css"
function Card({title,text}) {
  return (
    <div className='card'>
        <h2>{title}</h2>
        <p>{text}</p>      
    </div>
  )
}

export default Card
