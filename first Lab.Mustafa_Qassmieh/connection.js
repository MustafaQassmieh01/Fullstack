const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.URI 
console.log('MongoDB URI:', url); 

async function main() {
    try {
        await mongoose.connect(url);

        const mgDB = mongoose.connection;

        mgDB.on('connected', () => {
            console.log('MongoDB & Mongoose Connected');
        });

        mgDB.on('error', (err) => {
            console.error('Connection error:', err);
        });

        mgDB.on('disconnected', () => {
            console.log('MongoDB & Mongoose Disconnected');
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

module.exports =main;