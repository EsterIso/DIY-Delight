import { pool } from "../config/database.js";

export const getExteriors = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM exterior ORDER BY name ASC`);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export const getRoofs = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM roof ORDER BY name ASC`);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( {error: error.message});
    }
}

export const getWheels = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM wheels ORDER BY name ASC`);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( {error: error.message});
    }
}

export const getInteriors = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM interior ORDER BY name ASC`)
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( {error: error.message});
    }
}

