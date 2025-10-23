import { pool } from '../config/database.js';

export const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( {error: error.message });
    }
}

export const createCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, price } = req.body;
        const results = await pool.query(`
            INSERT INTO cars (name, exterior, roof, wheels, interior, price)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, exterior, roof, wheels, interior, price]
        );

        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export const getCarById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT *
            FROM cars
            WHERE id=$1
        `;

        const carId = req.params.carId;
        const results = await pool.query(selectQuery, [carId]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.error(409).json( {error: error.message} );
    }
}

export const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, exterior, roof, wheels, interior, price } = req.body;
        const results = await pool.query(`
            UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6 
            WHERE id = $7 RETURNING *`,
            [name, exterior, roof, wheels, interior, price, id]
        );

        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(`DELETE FROM gift WHERE id = $1`, [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}
