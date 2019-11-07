require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const carsRouter = require('./api/routers/carsRouter');

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet('dev'));
server.use('/api/cars', carsRouter);

// Default Endpoint
server.get('/', (req,res) =>{
    res.status(200).send('<h2>Server is working, check /api/cars</h2>');
});

const _port = process.env.PORT || 4000;
server.listen(_port, () => console.log(`Server is alive on port ${_port}.`));