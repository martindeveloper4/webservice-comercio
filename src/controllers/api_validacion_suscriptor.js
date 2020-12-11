'use strict'
const con = require('../conexion/conexion');
//var Freshdesk = require('freshdesk-api');
//var freshdesk = new Freshdesk('https://newaccount1607623402324.freshdesk.com', 'RMO0bnVkex7LQ1VEfj8x');


// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getValidacionSuscriptor(req,res){
    /**
     * Consulta a la base de datos de la tabla SUSCRIPCION
    */
    let nro_document =  req.body.nro_documento;
    let tipo_document = req.body.tipo_documento;


    if (tipo_document == 1) {

        var sql_cliente = "SELECT * FROM cliente WHERE nrodni="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rows);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Clciente no enontrado',
                    code: '0'
                });
                

            }else if (cliente.rowCount > 0 ){
                res.status(200).json({
                    message: 'Cliente  Encontrado',
                    code: '1'
                });
            }

        })

    
        return false;

    } else if (tipo_document == 2) {

        var sql_cliente = "SELECT *from cliente where nrocarnetextranjeria="+nro_document;
                                                                                

        con.query(sql_cliente, function (err, cliente, field) {
            
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Cliente no encontrado',
                    code: '0'
                });
            
            }
            else if (cliente.rowCount > 0 ){
                res.status(200).json({
                    message: 'Cliente  Encontrado',
                    code: '1'
                });
            }
        });
        return false;

    } else if (tipo_document == 3) {

        var sql_cliente = "SELECT *from cliente where nroruc="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rowCount);
            if(cliente.rowCount == 0 ){
                res.status(200).json({
                    message: 'Cliente no encontrado',
                    code: '0'
                });
                

            }
            else if (cliente.rowCount > 0 ){
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
	getValidacionSuscriptor,
}


