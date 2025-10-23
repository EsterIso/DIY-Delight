import { useState, useEffect } from 'react'
import CarsAPI from '../services/CarsAPI.js'
import Car from '../components/CarsCard.jsx'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const carsData = await CarsAPI.getAllCars()
        setCars(carsData)
      } catch (error) {
        console.error('Error loading cars:', error)
      }
    }

    fetchAllCars()
  }, [])

  return (
    <div className='all-cars'>
      <main>
        {
          cars && cars.length > 0 ? (
            cars.map((car) => (
              <Car
                key={car.id}
                id={car.id}
                name={car.name}
                image={car.image}
                exterior={car.exterior}
                roof={car.roof}
                wheels={car.wheels}
                interior={car.interior}
                price={car.price}
              />
            ))
          ) : (
            <h2>
              <i className="fa-solid fa-car-burst fa-shake"></i> {'No cars available right now!'}
            </h2>
          )
        }
      </main>
    </div>
  )
}

export default ViewCars;