'use strict'
const con = require('../conexion/conexion');

// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
//var Freshdesk = require('freshdesk-api');
//var freshdesk = new Freshdesk('https://newaccount1607357966352.freshdesk.com', 'jXAJKBYPAW8cOmqu1gL');


// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getPaquetes(req,res){

    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
     */
     
    let dni = req.body.dni;

    var sql_paquete = "SELECT ";
    sql_paquete+="sus.idcliente, ";
    sql_paquete+="sus.producto, ";
    sql_paquete+="sus.pagomensual, ";
    sql_paquete+="sus.periodo, ";
    sql_paquete+="sus.diasentregadiario, ";
    sql_paquete+="sus.estado, ";
    sql_paquete+="sus.id_grupo, ";
    sql_paquete+="cli.nombre ";
    sql_paquete+="FROM suscripcion sus ";
    sql_paquete+="INNER JOIN cliente cli ON cli.id = sus.idcliente ";
    sql_paquete+="WHERE sus.id_grupo=3  and  cli.nrodni="+dni ;

    
    //Ejecucion de la consulta y respuesta de la consulta de la tabla suscripcion.
    con.query(sql_paquete, function (err, paquetes, field) {
        if (err) return res.status(500).send({message:err})
        res.status(200).send({data:paquetes});
    });


    // Insercion de datos en la tabla tipificacion, que usara el bot
    var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + dni +"','Consulta Informativa de Paquete','LLAMADAS INFORMATIVAS','0', '', 'CONSULTAS','CONSULTAS DE FACTURACION')";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    
/*
    // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
    freshdesk.createTicket({
        name: nombre,
        email: correo,
        subject: 'CONSULTA',
        description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
        status: 2,
        priority: 1
    }, function (err, data) {
        console.log(err || data)
    })
*/
}


module.exports = {
	getPaquetes,
}


