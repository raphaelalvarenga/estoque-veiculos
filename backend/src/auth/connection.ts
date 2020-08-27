import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Carregando o dotenv
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
});

export default connection;