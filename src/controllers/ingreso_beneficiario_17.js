'use strict'
const con = require('../conexion/conexion');

// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607357966352.freshdesk.com', 'jXAJKBYPAW8cOmqu1gL');

/*
 CONSULTAS 
SP-17 --> Consulta Ingreso de Beneficiario

*/
// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket

// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getBeneficiario(req,res){
        
    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
    */

    let dni = req.body.dni;

    //Ejecucion de la consulta y respuesta de la consulta de la tabla suscripcion.
    
    // Insercion de datos en la tabla tipificacion, que usara el bot
    var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + dni +"','Consulta Ingreso Beneficiario','CLUB DEL SUSCRIPTOR','0', '', 'CONSULTAS','TIENDA CLUB')";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    

    // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
    freshdesk.createTicket({
        name: 'martin',
        email: 'martin@gmail.com',
        subject: 'CONSULTA',
        description: 'CONSULTA INGRESO DE BENEFICIARIO',
        status: 2,
        priority: 1
    }, function (err, data) {
        console.log(err || data)
    })

    res.json({
        message: 'Instrucciones para Registrar un Usuario',
        instrucciones: '1. Leer Instrucciones ',
        video: '2. Ver Video'
    });

}


module.exports = {
	getBeneficiario,
}