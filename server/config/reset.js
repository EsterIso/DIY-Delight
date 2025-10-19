import { pool } from './database.js'
import './dotenv.js'

const createCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            name VARCHAR(255) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('Villager Table created Successfully');
    } catch (error) {
        console.error('Error creating Villager table', error);
    }
}

const seedCarsTable = async () => {
    await createCarTable();

    carsData.forEach((car) => {
        const insertQuery = `
            INSERT INTO cars (name, exterior, roof, wheels, interior)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [
            car.name,
            car.exterior,
            car.roof,
            car.wheels,
            car.interior
        ];

        pool.query(insertQuery, values, (err, res) => {
            if(err) {
                console.error('Error inserting villager', err);
                return;
            }
            console.log(`${car.name} added successfully`);
        });
    });
}

seedCarsTable();