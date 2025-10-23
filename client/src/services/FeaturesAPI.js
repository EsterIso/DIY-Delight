const API_BASE_URL = import.meta.env.VITE_API_URL;

async function getExteriors() {
    const response = await fetch(`${API_BASE_URL}/features/exterior`);
    const result = await response.json();
    return result;
}

async function getInteriors() {
    const response = await fetch(`${API_BASE_URL}/features/interior`);
    const result = await response.json();
    return result;
}

async function getRoofs() {
    const response = await fetch(`${API_BASE_URL}/features/roof`);
    const result = await response.json();
    return result;
}

async function getWheels() {
    const response = await fetch(`${API_BASE_URL}/features/wheels`);
    const result = await response.json();
    return result;
}

export default {
    getExteriors,
    getInteriors,
    getRoofs,
    getWheels
}