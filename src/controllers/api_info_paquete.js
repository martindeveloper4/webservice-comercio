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
function getPaquetes(req,res){    
    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
    */
    var tipo_doc = req.body.tipo_documento;
    var nrodoc =  req.body.dni;
    var tip_suscripcion = req.body.tipo_suscripcion;


    if (tipo_doc == 1) {

        var sql_paquete = "SELECT ";
        sql_paquete+="sus.producto, ";
        sql_paquete+="sus.pagomensual, ";
        sql_paquete+="sus.periodo, ";
        sql_paquete+="sus.diasentregadiario, ";
        sql_paquete+="sus.importepagopendiente, ";
        sql_paquete+="sus.fechasiguienterenovacion, ";
        sql_paquete+="sus.fechaultimopagocancelado, ";
        sql_paquete+="sus.importeultimopagocancelado, ";
        sql_paquete+="cli.nrodni, ";
        sql_paquete+="cli.nombre, ";
        sql_paquete+="cli.nrodelivery, ";
        sql_paquete+="cli.correo ";
        sql_paquete+="FROM suscripcion sus ";
        sql_paquete+="INNER JOIN cliente cli ON cli.id = sus.idcliente ";
        sql_paquete+="WHERE sus.id_grupo="+ tip_suscripcion +" AND cli.nrodni="+nrodoc;
        

        con.query(sql_paquete, function (err, paquetes, field) {
            console.log(paquetes.rowCount);
            if(paquetes.rowCount == 0 ){
                res.status(200).json({
                    message: 'No cuenta con ningun paquete de suscripcion actualmente',
                    code: '0'
                });
                

            }
            if(paquetes.rowCount == 1 ){
                res.status(200).json({
                    data: paquetes.rows
                });

                var dnis = paquetes.rows[0]['nrodni'];
                console.log(dnis);
                var nombre = paquetes.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = paquetes.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = paquetes.rows[0]['correo'];
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
                    subject: 'CONSULTA',
                    description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                    status: 2,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })

    
        return false;

    } else if (tipo_doc == 2) {

        var sql_cliente = "SELECT *from cliente where nrocarnetextranjera="+nrodoc;
        

        con.query(sql_cliente, function (err, cliente, field) {
            
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Cliente no encontrado',
                    code: '0'
                });
                

            }
            if(cliente.rowCount == 1 ){
                res.status(200).json({
                    message: 'Cliente  Encontrado',
                    code: '1'
                });
            }
        });
        return false;

    } else if (tipo_doc == 3) {

        var sql_cliente = "SELECT *from cliente where nroruc="+nrodoc;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rowCount);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Cliente no encontrado',
                    code: '0'
                });
                

            }
            if(cliente.rowCount == 1 ){
                res.status(200).json({
                    message: 'Cliente  Encontrado',
                    code: '1'
                });
            }
        });
        return false;

    } else {
        res.status(200).json({
            data: 'Ingrese una opcion verdadera'
        });
    }
    

}


module.exports = {
	getPaquetes,
}


