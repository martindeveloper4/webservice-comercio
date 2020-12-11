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

  if (parseInt(tipo_document) == 1) {
    sql_suscripcion += " AND cli.nrodni=" + nro_document;
  } else if (parseInt(tipo_document) == 2) {
    sql_suscripcion += " AND cli.nrocarnetextranjeria=" + nro_document;
  } else if (parseInt(tipo_document) == 3) {
    sql_suscripcion += " AND cli.nroruc=" + nro_document;
  } else {
    return res.status(200).json({
      message: "No existe el tipo de documento",
      code: "0",
    });
  }

  con.query(sql_suscripcion, function (err, suscripciones, field) {
    if (suscripciones.rowCount == 0) {
      res.status(200).json({
        message: "No Tiene suscripcion",
        code: "0",
      });
    } else {
      let len = suscripciones.rows.length;
      let message = "";
      let code = "";

      if (len > 0) {
        for (let i = 0; i < len; i++) {
          message += `${suscripciones.rows[i].id_suscripcion} > ${suscripciones.rows[i].producto} </br>`;
        }
        code = "1";
      } else {
        message = "No tiene suscripciones";
        code = "0";
      }

      res.status(200).json({
        message,
        code,
      });
    }
  });
}

module.exports = {
  getListaSuscripciones,
};
