import { pool } from './database.js';
import exteriorData from '../data/exterior.js';
import roofData from '../data/roof.js';
import wheelsData from '../data/wheels.js';
import interiorData from '../data/interior.js';
import './dotenv.js';

const createCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL, 
            price INT NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('Cars Table created Successfully');
    } catch (error) {
        console.error('Error creating Cars table', error);
    }
}

const createExteriorTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS exterior;
        CREATE TABLE IF NOT EXISTS exterior (
            name VARCHAR(255) NOT NULL,
            hex VARCHAR(7) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('Exterior Table created Successfully');
    } catch (error) {
        console.error('Error creating Exterior table', error);
    }
}

const seedExteriorTable = async () => {
    await createExteriorTable();

    exteriorData.forEach((exterior) => {
        const insertQuery = `
            INSERT INTO exterior (name, hex, image, price) 
            VALUES ($1, $2, $3, $4);
        `;

        const values = [
            exterior.name,
            exterior.hex,
            exterior.image,
            exterior.price
        ];

        pool.query(insertQuery, values, (err, res) => {
            if(err) {
                console.error('Error inserting exterior', err);
                return;
            }
            console.log(`${exterior.name} added successfully`);
        });
    });
}

const createRoofTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS roof;
        CREATE TABLE IF NOT EXISTS roof (
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('Roof Table created Successfully');
    } catch (error) {
        console.error('Error creating Roof table', error);
    }
}



const seedRoofTable = async () => {
    await createRoofTable();

    roofData.forEach((roof) =>{
        const insertQuery = `
            INSERT INTO roof (name, image, price)
            VALUES ($1, $2, $3);
        `;

        const values = [
            roof.name,
            roof.image,
            roof.price
        ];

        pool.query(insertQuery, values, (err, res) => {
            if(err) {
                console.error('Error inserting roof', err);
                return;
            }
            console.log(`${roof.name} added successfully`);
        })
    });
}

const createWheelsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS wheels;
        CREATE TABLE IF NOT EXISTS wheels (
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );
    `;

     try {
        const res = await pool.query(createTableQuery);
        console.log('Wheels Table created Successfully')
     } catch (error) {
        console.error('Error creating Wheels table', error);
     }
}

const seedWheelsTable = async () => {
    await createWheelsTable();

    wheelsData.forEach((wheels) => {
        const insertQuery = `
            INSERT INTO wheels (name, image, price)
            VALUES ($1, $2, $3);
        `;

        const values = [
            wheels.name,
            wheels.image,
            wheels.price
        ];

        pool.query(insertQuery, values, (err, res) => {
            if(err) {
                console.error('Error inserting wheels', err);
                return;
            }
            console.log(`${wheels.name} added successfully`);
        });
    });
}

const createInteriorTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS interior;
        CREATE TABLE IF NOT EXISTS interior (
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );
    `;

    try {
        const res = pool.query(createTableQuery);
        console.log('Interior Table created Successfully');
    } catch (error) {
        console.error('Error creating Interior table', error);
    }
}

const seedInteriorTable = async () => {
    await createInteriorTable();

    interiorData.forEach((interior) => {
        const insertQuery = `
            INSERT INTO interior (name, image, price)
            VALUES ($1, $2, $3);
        `;

        const values = [
            interior.name,
            interior.image,
            interior.price
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error inserting interior', err);
                return;
            }
            console.log(`${interior.name} added successfully`);
        })
    });
}

await createCarTable();
await seedExteriorTable();
await seedRoofTable();
await seedWheelsTable();
await seedInteriorTable();