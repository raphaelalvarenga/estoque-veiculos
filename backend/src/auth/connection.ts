import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Carregando o dotenv
dotenv.config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    port: parseInt(process.env.DBPORT!),
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
});

export default connection;
