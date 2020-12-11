'use strict'
const con = require('../conexion/conexion');
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607623402324.freshdesk.com', 'RMO0bnVkex7LQ1VEfj8x');




function getDescuento(req,res){

    let nro_document =  req.body.nro_documento || req.query.nro_documento;
    let tipo_document = req.body.tipo_documento || req.query.tipo_documento;


    if (tipo_document == 1) {
        var sql_cliente = "SELECT "; 
        sql_cliente+="nrodni, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nrodni="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rows);
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

                var nrodni = cliente.rows[0]['nrodni'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);


                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrodni +"','Consulta periodo, dias de reparto, direccion','CLUB DEL SUSCRIPTOR','0', '"+ nrodelivery +"', 'CONSULTAS','TIENDA CLUB')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA DESCUENTOS Y PROMOCIONESE',
                    description: 'CONSULTA DESCUENTOS Y PROMOCIONES',
                    status: 2,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })

    
        return false;

    } else if (tipo_document == 2) {

        var sql_cliente = "SELECT "; 
        sql_cliente+="nrocarnetextranjeria, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nrodni="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rows);
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

                var nrocarnetextranjeria = cliente.rows[0]['nrocarnetextranjeria'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);


                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrocarnetextranjeria +"','Consulta periodo, dias de reparto, direccion','CLUB DEL SUSCRIPTOR','0', '"+ nrodelivery +"', 'CONSULTAS','TIENDA CLUB')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA DESCUENTOS Y PROMOCIONESE',
                    description: 'CONSULTA DESCUENTOS Y PROMOCIONES',
                    status: 2,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })
        return false;

    } else if (tipo_document == 3) {

        var sql_cliente = "SELECT "; 
        sql_cliente+="nroruc, ";
        sql_cliente+="nombre, ";
        sql_cliente+="nrodelivery, ";
        sql_cliente+="correo ";
        sql_cliente+="FROM cliente ";
        sql_cliente+="WHERE nroruc="+nro_document;
        

        con.query(sql_cliente, function (err, cliente, field) {
            console.log(cliente.rows);
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

                var nroruc = cliente.rows[0]['nroruc'];
                console.log(dnis);
                var nombre = cliente.rows[0]['nombre'];
                console.log(nombre);
                var nrodelivery = cliente.rows[0]['nrodelivery'];
                console.log(nrodelivery);
                var correo = cliente.rows[0]['correo'];
                console.log(correo);


                var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nroruc +"','Consulta periodo, dias de reparto, direccion','CLUB DEL SUSCRIPTOR','0', '"+ nrodelivery +"', 'CONSULTAS','TIENDA CLUB')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    //console.log("1 record inserted " + dni);
                });

                freshdesk.createTicket({
                    name: nombre,
                    email: correo,
                    subject: 'CONSULTA DESCUENTOS Y PROMOCIONESE',
                    description: 'CONSULTA DESCUENTOS Y PROMOCIONES',
                    status: 2,
                    priority: 1
                }, function (err, data) {
                    //console.log(err || data)
                })
            }
        })
        return false;

    } else {
        res.status(200).json({
            message: 'Ingrese una opcion verdadera'
        });
    }
    

}


module.exports = {
	getDescuento,
}


