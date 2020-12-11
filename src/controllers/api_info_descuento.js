'use strict'
const con = require('../conexion/conexion');
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607623402324.freshdesk.com', 'RMO0bnVkex7LQ1VEfj8x');
/*
CONSULTAS 
SP-04 --> Consulta Informativa General de Paquete
SP-07 --> Consulta Monto de Pago
SP-08 --> Consulta de Fecha de Renovacion de Pago
SP-11 --> Consulta de Pago Cancelado
*/


// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getDescuento(req,res){    
    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
    */

    var nro_document = req.body.nro_documento;

    if (nro_document.length == 8) {

        var sql_cliente = "SELECT ";    
        sql_cliente+="nrodni, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nrodni="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rowCount);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Hola '+cliente.rows[0]['nombre']+' hemos detectado que eres suscriptor pero tienes deuda',
                    code: '0'
                });
                

            }
            if(cliente.rowCount == 1 ){
                res.status(200).json({
                    message: 'Felicitaciones '+ cliente.rows[0]['nombre'] +' <br> Puedes acceder a los siguientes descuentos link: <br> Clubelcomercio.com.pe ',
                    code: '1'
                });

                var dnis = cliente.rows[0]['nrodni'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);

                
                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + dnis +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '"+ nrodelivery +"', 'CONSULTAS','CONSULTA DE FACTURACION')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                    description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                    status: 0,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })

    
        return false;

    } else if (nro_document.length == 9) {

        var sql_cliente = "SELECT ";    
        sql_cliente+="nrocarnetextranjeria, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nrocarnetextranjeria="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rowCount);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'No cuenta con ningun paquete de suscripcion actualmente',
                    code: '0'
                });
                

            }
            if(cliente.rowCount == 1 ){
                res.status(200).json({
                    data: cliente.rows
                });

                var nrocarnetextranjeria = paquetes.rows[0]['nrocarnetextranjeria'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);

                
                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrocarnetextranjeria +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '"+ nrodelivery +"', 'CONSULTAS','CONSULTA DE FACTURACION')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                    description: 'CONSULTA DESCUENTOS Y PROMOCIONES',
                    status: 0,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })

    
        return false;

    } else if (nro_document.length == 11) {

        var sql_cliente = "SELECT ";    
        sql_cliente+="nroruc, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nroruc="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rowCount);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'No cuenta con ningun paquete de suscripcion actualmente',
                    code: '0'
                });
                

            }
            if(cliente.rowCount == 1 ){
                res.status(200).json({
                    message: 'Puede ver sus descuento de suscriptor en el siguiente link: '
                });

                var nroruc = cliente.rows[0]['nroruc'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);

                
                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nroruc +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '"+ nrodelivery +"', 'CONSULTAS','CONSULTA DE FACTURACION')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA DESCUENTOS Y PROMOCIONESE',
                    description: 'CONSULTA DESCUENTOS Y PROMOCIONES',
                    status: 0,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })

    
        return false;

    } else {
        res.status(200).json({
            message: 'El numero de documento identificado no es correcto'
        });
    }
    

}


module.exports = {
	getDescuento,
}


