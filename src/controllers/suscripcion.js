const con = require("../conexion/conexion");
const unirest = require("unirest");

var Freshdesk = require("freshdesk-api");
var freshdesk = new Freshdesk(
  "https://newaccount1607032711732.freshdesk.com",
  "xM5pV239UuQSLubfdvS5"
);

const API_KEY = "xM5pV239UuQSLubfdvS5";
const FD_ENDPOINT = "newaccount1607032711732";

let PATH_TICKETS = "/api/v2/tickets";
let URL_TICKETS = "https://" + FD_ENDPOINT + ".freshdesk.com" + PATH_TICKETS;

getSuscripciones = (req, res) => {
  let token = req.body.token || req.query.token || req.params.token;

  let sql = `SELECT 
                  s.id_suscripcion,
                  s.producto,
                  s.pagomensual,
                  s.periodo,
                  s.diasentregadiario,
                  s.importepagopendiente,
                  s.fechasiguienterenovacion,
                  s.fechaultimopagocancelado,
                  s.importeultimopagocancelado
                    FROM suscripcion s
                        INNER JOIN cliente c ON c.id_cliente = s.id_cliente 
                        WHERE c.token='${token}'`;

  con.query(sql, function (err, arr, field) {
    if (arr.rowCount > 0) {
      res.status(200).json({
        message: arr.rows,
        code: "1",
      });
    } else {
      res.status(200).json({
        message: "No Tiene suscripcion",
        code: "0",
      });
    }
  });
};

getSuscripcion = (req, res) => {
  let id = req.query.id || req.body.id || req.params.id;
  let token = req.body.token || req.query.token;

  console.log(id, token);

  let sql = `SELECT
                          producto, 
                          pagomensual pagoMensual,
                          periodo,
                          diasentregadiario diasEntrega,
                          importepagopendiente importePagoPendiente,
                          to_char(fechasiguienterenovacion,'DD/MM/YYYY') fechaSiguienteRenovacion,
                          to_char(fechaultimopagocancelado,'DD/MM/YYYY') fechaUltimoPagoCancelado,
                          importeultimopagocancelado importeUltimoPagoCancelado
                          FROM suscripcion s
                          INNER JOIN cliente c ON c.id_cliente = s.id_cliente
                          WHERE s.id_suscripcion=${id} AND c.token='${token}'`;

  var fields = {
    email: "majerhua123@gmail.com",
    subject: "CONSULTA GENERAL DE PAQUETES",
    description: "CONSULTA GENERAL DE PAQUETES",
    status: 2,
    priority: 1,
  };

  var Request = unirest.post(URL_TICKETS);

  Request.auth({
    user: API_KEY,
    pass: "X",
    sendImmediately: true,
  })
    .type("json")
    .send(fields)
    .end(function (response) {
      if (response.status == 201) {
        //console.log("Location Header : "+ response.headers['location'])
      } else {
        //console.log("X-Request-Id :" + response.headers['x-request-id']);
      }
    });

  con.query(sql, function (err, arr, field) {
    try {
      if (err) throw err;

      if (arr.rowCount > 0) {
        newTipificacion(1);
        res.status(200).json({
          message: arr.rows[0],
          code: "1",
        });
      } else {
        res.status(200).json({
          message: "No Tiene suscripcion",
          code: "0",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e.message,
        code: "0",
      });
    }
  });
};

validarEstadoSuscripcion = (req, res) => {
  let token = req.body.token || req.query.token || req.params.token;

  let sql_suscripcion = ` SELECT *FROM suscripcion s 
                          INNER JOIN cliente c ON c.id_cliente = s.id_cliente
                          WHERE s.estado = 'Inactivo' AND c.token='${token}'`;

  var fields = {
    email: "majerhua123@gmail.com",
    subject: "CONSULTA INFORMATIVA CLUB",
    description: "CONSULTA INFORMATIVA CLUB",
    status: 2,
    priority: 1,
  };

  var Request = unirest.post(URL_TICKETS);

  Request.auth({
    user: API_KEY,
    pass: "X",
    sendImmediately: true,
  })
    .type("json")
    .send(fields)
    .end(function (response) {
      if (response.status == 201) {
        //console.log("Location Header : "+ response.headers['location'])
      } else {
        //console.log("X-Request-Id :" + response.headers['x-request-id']);
      }
    });

  con.query(sql_suscripcion, function (err, arr, field) {
    let suscripciones = arr.rows;
    newTipificacion(2);

    if (suscripciones.length == 0) {
      res.status(200).json({
        message: "No tiene deuda",
        code: "1",
      });
    } else {
      res.status(200).json({
        message: "Tiene deuda",
        code: "0",
      });
    }
  });
};

validateCancellation = (req, res) => {
  let id = req.query.id || req.body.id;
  let token = req.body.token || req.query.token;

  console.log(token, id);

  var sql = `SELECT 
            s.producto,
            s.estadoanulacion,
            to_char(s.fechaanulacion,'DD/MM/YYYY') fechaanulacion
        		FROM suscripcion s
        		INNER JOIN cliente c ON c.id_cliente = s.id_cliente
        		WHERE s.id_suscripcion=${id} AND c.token='${token}' `;

  con.query(sql, function (err, arr, field) {
    try {
      if (err) throw err;
      if (arr.rowCount > 0) {
        res.status(200).json({
          message: arr.rows[0],
          code: "1",
        });
      } else {
        res.status(200).json({
          message: "No existe la suscripcion o token",
          code: "0",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        code: "0",
      });
    }
  });
};

getBeneficiarios = (req, res) => {
  let token = req.body.token || req.query.token || req.params.token;
  let id = req.body.id || req.query.id || req.params.id;

  id = id == undefined ? 0 : id;

  let sql = `SELECT 
                  s.producto,
                  s.beneficiario beneficiarios
                    FROM suscripcion s
                        INNER JOIN cliente c ON c.id_cliente = s.id_cliente 
                        WHERE c.token='${token}' AND s.id_suscripcion=${id}`;

  con.query(sql, function (err, arr, field) {
    if (arr.rowCount > 0) {
      res.status(200).json({
        message: arr.rows[0],
        code: "1",
      });
    } else {
      res.status(200).json({
        message: "No Tiene Beneficiarios",
        code: "0",
      });
    }
  });
};

consultaPQ = (req, res) => {
  let token = req.body.token || req.query.token || req.params.token;
  let id = req.body.id || req.query.id || req.params.id;

  id = id == undefined ? 0 : id;

  let sql = `SELECT 
              s.producto,
              s.pagomensual,
              s.periodo,
              s.diasentregadiario,
              s.importepagopendiente,
              s.fechasiguienterenovacion,
              s.fechaultimopagocancelado,
              c.correoelectronicopq,
              c.estadocorreoelectronicopq
              FROM suscripcion s
              INNER JOIN cliente c ON c.id_cliente=s.id_cliente
              WHERE id_suscripcion=${id} AND token='${token}`;

  con.query(sql, function (err, arr, field) {
    if (arr.rowCount > 0) {
      res.status(200).json({
        message: arr.rows[0],
        code: "1",
      });
    } else {
      res.status(200).json({
        message: "No existe Suscripcion",
        code: "0",
      });
    }
  });
};

newTipificacion = (type) => {
  let numeroDocuemento = "43979441";
  let nrodelivery = "486061";

  if (type == 1) {
    var sql =
      "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" +
      numeroDocuemento +
      "','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '" +
      nrodelivery +
      "', 'CONSULTAS','CONSULTA DE FACTURACION')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  } else {
    var sql =
      "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" +
      numeroDocuemento +
      "','Consulta periodo, dias de reparto, direccion','CLUB DEL SUSCRIPTOR','0', '" +
      nrodelivery +
      "', 'CONSULTAS','TIENDA CLUB')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }
};

module.exports = {
  getSuscripciones,
  getSuscripcion,
  validarEstadoSuscripcion,
  validateCancellation,
  getBeneficiarios,
  consultaPQ,
};
