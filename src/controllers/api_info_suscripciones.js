"use strict";
const con = require("../conexion/conexion");

function getListaSuscripciones(req, res) {
  let nro_document = req.body.nro_documento || req.query.nro_documento;
  let tipo_document = req.body.tipo_documento || req.query.tipo_documento;
  let id_subcategoria = req.body.subcategoria || req.query.subcategoria;

  let sql_suscripcion = "SELECT ";
  sql_suscripcion += "sus.id_suscripcion, ";
  sql_suscripcion += "sus.producto, ";
  sql_suscripcion += "sus.periodo ";
  sql_suscripcion += "FROM suscripcion sus ";
  sql_suscripcion +=
    "INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
  sql_suscripcion += "WHERE sus.id_subcategoria=" + id_subcategoria;

  if (tipo_document == 1) {
    sql_suscripcion += " AND cli.nrodni=" + nro_document;
  } else if (tipo_document == 2) {
    sql_suscripcion += " AND cli.nrocarnetextranjeria=" + nro_document;
  } else if (tipo_document == 3) {
    sql_suscripcion += " AND cli.nroruc=" + nro_document;
  }
  con.query(sql_suscripcion, function (err, suscripciones, field) {
    if (suscripciones.rowCount == 0) {
      res.status(200).json({
        message: "No Tiene suscripcion",
        code: "0",
      });
    } else {
      res.status(200).json({
        message: "tiene  suscripcion",
        code: "1",
      });
    }
  });
}

module.exports = {
  getListaSuscripciones,
};
