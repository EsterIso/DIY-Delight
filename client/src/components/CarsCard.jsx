import React, { useState, useEffect } from 'react'
import CarsAPI from '../services/CarsAPI.js'

const CarsCard = (props) => {
  const [car, setCar] = useState({})
  const [price, setPrice] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const carData = await CarsAPI.getCarById(props.id)
        setCar(carData)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [props.id])

  useEffect(() => {
    if (car.price) {
      const formatted = `$${Number(car.price).toLocaleString()}`
      setPrice(formatted)
    }
  }, [car])

  return (
    <article className='car-information'>
      <img src={car.image} alt={car.name} />

      <div className='car-information-overlay'>
        <div className='text'>
          <h3>
            <img src={car.image} alt={car.name} className='car-icon' /> {car.name}
          </h3>

          <div className='car-summary'>
            <p><strong>🖌️ Exterior:</strong> {car.exterior}</p>
            <p><strong>😎 Roof:</strong> {car.roof}</p>
          </div>

          <div className='car-summary'>
            <p><strong>🛴 Wheels:</strong> {car.wheels}</p>
            <p><strong>💺 Interior:</strong> {car.interior}</p>
          </div>

          <div className='car-price'>
            <p>💰 {price}</p>
            <a href={`/customcars/${car.id}`} role='button'>Details</a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CarsCard;
