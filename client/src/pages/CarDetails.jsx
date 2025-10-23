import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI.js'
import FeaturesAPI from '../services/FeaturesAPI.js'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const [car, setCar] = useState({})
    const [price, setPrice] = useState('')
    const [exteriorImage, setExteriorImage] = useState('')
    const [roofImage, setRoofImage] = useState('')
    const [wheelsImage, setWheelsImage] = useState('')
    const [interiorImage, setInteriorImage] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const carData = await CarsAPI.getCarById(id)
                setCar(carData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [id])

    useEffect(() => {
        if (car.price) {
            const formatted = `$${Number(car.price).toLocaleString()}`
            setPrice(formatted)
        }
    }, [car])

    useEffect(() => {
        const fetchFeatureImages = async () => {
            try {
                const [exteriors, roofs, wheels, interiors] = await Promise.all([
                    FeaturesAPI.getExteriors(),
                    FeaturesAPI.getRoofs(),
                    FeaturesAPI.getWheels(),
                    FeaturesAPI.getInteriors()
                ])

                const exteriorMatch = exteriors.find(ext => ext.name === car.exterior)
                const roofMatch = roofs.find(rf => rf.name === car.roof)
                const wheelsMatch = wheels.find(wh => wh.name === car.wheels)
                const interiorMatch = interiors.find(int => int.name === car.interior)

                if (exteriorMatch) setExteriorImage(exteriorMatch.image)
                if (roofMatch) setRoofImage(roofMatch.image)
                if (wheelsMatch) setWheelsImage(wheelsMatch.image)
                if (interiorMatch) setInteriorImage(interiorMatch.image)
            } catch (error) {
                console.error('Error fetching feature images:', error)
            }
        }

        if (car.exterior && car.roof && car.wheels && car.interior) {
            fetchFeatureImages()
        }
    }, [car])

    return (
        <article className='car-information'>
            <div className='car-details-header'>
                <h2>{car.name}</h2>
                <div className='car-price'>
                    <h3>💰 {price}</h3>
                </div>
            </div>

            <div className='car-features-grid'>
                <div className='feature-card'>
                    <h3>🖌️ Exterior</h3>
                    {exteriorImage && <img src={exteriorImage} alt={car.exterior} />}
                    <p>{car.exterior}</p>
                </div>

                <div className='feature-card'>
                    <h3>😎 Roof</h3>
                    {roofImage && <img src={roofImage} alt={car.roof} />}
                    <p>{car.roof}</p>
                </div>

                <div className='feature-card'>
                    <h3>🛴 Wheels</h3>
                    {wheelsImage && <img src={wheelsImage} alt={car.wheels} />}
                    <p>{car.wheels}</p>
                </div>

                <div className='feature-card'>
                    <h3>💺 Interior</h3>
                    {interiorImage && <img src={interiorImage} alt={car.interior} />}
                    <p>{car.interior}</p>
                </div>
            </div>

            <div className='car-actions'>
                <a href={`/edit/${car.id}`} role='button'>Edit Car</a>
                <a href='/customcars' role='button'>Back to All Cars</a>
            </div>
        </article>
    )
}

export default CarDetails