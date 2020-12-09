
/**
 * CONECCION CON POSTGRESQL - BD ALOJADA EN HEROKU
 */

const { Pool } = require("pg");
// Coloca aquí tus credenciales
var pool = new Pool({
  user: "syzgjuxrvlvkwc",
  password: "9a898e6b87b09028528dab653babf2247c599e301529f8e18977b6a3b507a565",
  database: "d8h18fe5g1jjr1",
  port: 5432,
  host: "ec2-3-211-176-230.compute-1.amazonaws.com",
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;





