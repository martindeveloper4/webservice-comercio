/**
 * CONECCION CON POSTGRESQL - BD ALOJADA EN HEROKU
 */

const { Pool } = require("pg");
// Coloca aquí tus credenciales
var pool = new Pool({
  user: "postgres",
  password: "IT0kYg53L56Mk3HYTZ4m",
  database: "AWS_ElComercio",
  port: 5432,
  host: "bpi-rpa-latam.cifz34qnrwkb.us-east-1.rds.amazonaws.com",
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
