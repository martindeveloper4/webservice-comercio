/**
 * CONECCION CON POSTGRESQL - BD ALOJADA EN HEROKU
 */

const { Pool } = require("pg");
// Coloca aquí tus credenciales
var pool = new Pool({
  user: "postgres",
  password: "rpalatam20",
  database: "AWS_ElComercio",
  port: 5432,
  host: "database.cpehi2ylfzlh.us-east-1.rds.amazonaws.com",
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
