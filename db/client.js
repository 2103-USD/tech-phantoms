
require("dotenv").config();

// Connect to DB
const { Client } = require("pg");

const DB_NAME = process.env.DATABASE_NAME || `techphantomsdb`;
const DB_URL =
    process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

module.exports = client;