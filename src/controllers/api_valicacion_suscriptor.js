'use strict'
const con = require('../conexion/conexion');
//var Freshdesk = require('freshdesk-api');
//var freshdesk = new Freshdesk('https://newaccount1607623402324.freshdesk.com', 'RMO0bnVkex7LQ1VEfj8x');
/*
 CONSULTAS 
SP-04 --> Consulta Informativa General de Paquete
SP-07 --> Consulta Monto de Pago
SP-08 --> Consulta de Fecha de Renovacion de Pago
SP-11 --> Consulta de Pago Cancelado
*/


// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getValicacionSuscriptor(req,res){    
    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
    */
    var nrodoc =  req.body.dni;
    var tipo_doc = req.body.tipo_documento;


    if (tipo_doc == 1) {

        var sql_cliente = "SELECT *from cliente where nrodni="+nrodoc;
        

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
	getValicacionSuscriptor,
}


