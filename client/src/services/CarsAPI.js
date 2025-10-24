const API_BASE_URL = import.meta.env.VITE_API_URL;

async function getAllCars(){
    const response = await fetch(`${API_BASE_URL}/cars/`);
    const data = await response.json();
    console.log(data);
    return data;
}

async function getCarById(id) {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) {
        console.error(`Failed to fetch event ${id}`);
        return null;
    }
    const data = await response.json();
    console.log(data);
    return data;
}

async function createCar(data) {
    const response = await fetch(`${API_BASE_URL}/cars/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
}

async function editCar(id, data) {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
}

async function deleteCar(id) {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });

    const result = response;
    return result;
}

export default {
    getAllCars,
    getCarById,
    createCar, 
    editCar,
    deleteCar
}