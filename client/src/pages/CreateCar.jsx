import { useEffect, useState } from 'react'
import CarsAPI from '../services/CarsAPI.js'
import FeaturesAPI from '../services/FeaturesAPI.js'

const CreateCar = () => {
  const [exteriors, setExteriors] = useState([])
  const [roofs, setRoofs] = useState([])
  const [wheels, setWheels] = useState([])
  const [interiors, setInteriors] = useState([])
  const [selected, setSelected] = useState({
    exterior: null,
    roof: null,
    wheels: null,
    interior: null,
  })
  const [carName, setCarName] = useState('')
  const [totalPrice, setTotalPrice] = useState(65000)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exteriorData, roofData, wheelsData, interiorData] = await Promise.all([
          FeaturesAPI.getExteriors(),
          FeaturesAPI.getRoofs(),
          FeaturesAPI.getWheels(),
          FeaturesAPI.getInteriors(),
        ])
        setExteriors(exteriorData)
        setRoofs(roofData)
        setWheels(wheelsData)
        setInteriors(interiorData)
      } catch (error) {
        console.error('Error loading car features:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let price = 65000
    Object.values(selected).forEach(item => {
      if (item && item.price) price += item.price
    })
    setTotalPrice(price)
  }, [selected])

  const handleSelect = (category, item) => {
    setSelected(prev => ({ ...prev, [category]: item }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const data = {
      name: carName || 'My New Car',
      exterior: selected.exterior.name,
      roof: selected.roof.name,
      wheels: selected.wheels.name,
      interior: selected.interior.name,
      price: totalPrice
    }
    const result = CarsAPI.createCar(data);
    window.location.href = '/customcars';
    console.log(result);
    } catch (error) {
      console.error(error.message);
    }
    
  }

  return (
    <div className="create-car">

      <div className="create-car-options">
        <div id="customization-options" className="car-options">
          <div className="car-options-section">
            <h3>Exterior</h3>
            <div className="options-grid">
              {exteriors.map((ext) => (
                <button
                  key={ext.name}
                  className={selected.exterior?.name === ext.name ? 'selected' : ''}
                  onClick={() => handleSelect('exterior', ext)}
                >
                  <img src={ext.image} alt={ext.name} />
                  <span>{ext.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="car-options-section">
            <h3>Roof</h3>
            <div className="options-grid">
              {roofs.map((roof) => (
                <button
                  key={roof.name}
                  className={selected.roof?.name === roof.name ? 'selected' : ''}
                  onClick={() => handleSelect('roof', roof)}
                >
                  <img src={roof.image} alt={roof.name} />
                  <span>{roof.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="car-options-section">
            <h3>Wheels</h3>
            <div className="options-grid">
              {wheels.map((wheel) => (
                <button
                  key={wheel.name}
                  className={selected.wheels?.name === wheel.name ? 'selected' : ''}
                  onClick={() => handleSelect('wheels', wheel)}
                >
                  <img src={wheel.image} alt={wheel.name} />
                  <span>{wheel.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="car-options-section">
            <h3>Interior</h3>
            <div className="options-grid">
              {interiors.map((int) => (
                <button
                  key={int.name}
                  className={selected.interior?.name === int.name ? 'selected' : ''}
                  onClick={() => handleSelect('interior', int)}
                >
                  <img src={int.image} alt={int.name} />
                  <span>{int.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="create-car-price">💰${totalPrice.toLocaleString()}</div>

      <form onSubmit={handleSubmit} className="create-car-name">
        <input
          type="text"
          placeholder="My New Car"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        <input type="submit" className="create-car-button" value="Create" />
      </form>
    </div>
  )
}


export default CreateCar