const con = require("../conexion/conexion");
const unirest = require('unirest');

var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607032711732.freshdesk.com', 'xM5pV239UuQSLubfdvS5');

const API_KEY = "xM5pV239UuQSLubfdvS5";
const FD_ENDPOINT = "newaccount1607032711732";

  let PATH_TICKETS = "/api/v2/tickets";
  let URL_TICKETS =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH_TICKETS;

getSuscripciones = (req, res) => {
  let sql_suscripcion = `SELECT *FROM suscripcion WHERE id_cliente=${2}`;

  con.query(sql_suscripcion, function (err, arr, field) {
    let suscripciones = arr.rows;

    if (suscripciones.length == 0) {
      res.status(200).json({
        message: "No Tiene suscripcion",
        code: "0",
      });
    } else {
      res.status(200).json({
        message: suscripciones,
        code: "1",
      });
    }
  });
};

getSuscripcion = (req, res) => {
  let id = req.query.id || req.body.id || req.params.id;

  let sql_suscripcion = `SELECT
                          producto, 
                          pagomensual pagoMensual,
                          periodo,
                          diasentregadiario diasEntrega,
                          importepagopendiente importePagoPendiente,
                          to_char(fechasiguienterenovacion,'DD/MM/YYYY') fechaSiguienteRenovacion,
                          to_char(fechaultimopagocancelado,'DD/MM/YYYY') fechaUltimoPagoCancelado,
                          importeultimopagocancelado importeUltimoPagoCancelado
                          FROM suscripcion WHERE id_suscripcion=${id} AND id_cliente=${2}`;


    var fields = {
      'email': "majerhua123@gmail.com",
      'subject': "CONSULTA GENERAL DE PAQUETES",
      'description': "CONSULTA GENERAL DE PAQUETES",
      'status': 2,
      'priority': 1
    }
    
    var Request = unirest.post(URL_TICKETS);
    
    Request.auth({
      user: API_KEY,
      pass: "X",
      sendImmediately: true
    })
    .type('json')
    .send(fields)
    .end(function(response){
      
      if(response.status == 201){
        //console.log("Location Header : "+ response.headers['location'])
      }
      else{
          //console.log("X-Request-Id :" + response.headers['x-request-id']);
      }
    });

  con.query(sql_suscripcion, function (err, arr, field) {
    let suscripciones = arr.rows;

    if (suscripciones.length == 0) {
      res.status(200).json({
        message: "No Tiene suscripcion",
        code: "0",
      });
    } else {
      res.status(200).json({
        message: suscripciones[0],
        code: "1",
      });
    }
  });
};

validarEstadoSuscripcion = (req, res) => {

  let sql_suscripcion = `SELECT *FROM suscripcion WHERE estado = 'Inactivo' AND id_cliente=${2}`;

    var fields = {
      'email': "majerhua123@gmail.com",
      'subject': "CONSULTA INFORMATIVA CLUB",
      'description': "CONSULTA INFORMATIVA CLUB",
      'status': 2,
      'priority': 1
    }
    
    var Request = unirest.post(URL_TICKETS);
    
    Request.auth({
      user: API_KEY,
      pass: "X",
      sendImmediately: true
    })
    .type('json')
    .send(fields)
    .end(function(response){
      
      if(response.status == 201){
        //console.log("Location Header : "+ response.headers['location'])
      }
      else{
          //console.log("X-Request-Id :" + response.headers['x-request-id']);
      }
    });

  con.query(sql_suscripcion, function (err, arr, field) {
    let suscripciones = arr.rows;

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

module.exports = {
  getSuscripciones,
  getSuscripcion,
  validarEstadoSuscripcion,
};