'use strict'
const con = require('../conexion/conexion');
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607357966352.freshdesk.com', 'jXAJKBYPAW8cOmqu1gL');
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
    var nrodoc =  req.body.dni;
    var tipo_doc = req.body.tipo_documento;
    var nro_grup = req.body.nro_grupo;
    
    if (tipo_doc == 1) {
    
        var sql_paquete = "SELECT ";
        sql_paquete+="sus.id, ";
        sql_paquete+="sus.producto, ";
        sql_paquete+="sus.pagomensual, ";
        sql_paquete+="sus.periodo, ";
        sql_paquete+="sus.diasentregadiario, ";
        sql_paquete+="sus.estado, ";
        sql_paquete+="sus.id_grupo, ";
        sql_paquete+="cli.nombre ";
        sql_paquete+="FROM suscripcion sus ";
        sql_paquete+="INNER JOIN cliente cli ON cli.id = sus.idcliente ";
        sql_paquete+="WHERE sus.id_grupo="+ nro_grup +" and  cli.nrodni="+nrodoc;

        con.query(sql_paquete, function (err, paquetes, field) {
            if (err) return res.status(500).send({message:'Usted no es suscriptor del CLUB Actualmente '+nrodoc})
            res.status(200).json({
                data:paquetes.rows
            });
            console.log(paquetes.rows);
            //console.log(paquetes.rows[0]['producto']);
        });

        // Insercion de datos en la tabla tipificacion, que usara el bot
        var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrodoc +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '400274', 'CONSULTAS','CONSULTA DE FACTURACION')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            
            //console.log("1 record inserted " + dni);
        });
        

        // Creacion de Ticket en Freshdesk cuando se use el servicio consulta informativa general del Paquete
        freshdesk.createTicket({
            name: 'martin',
            email: 'martin@gmail.com',
            subject: 'CONSULTA',
            description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
            status: 2,
            priority: 1
        }, function (err, data) {
            console.log(err || data)
        })

        return false;
    } else if (tipo_doc == 2) {

        var sql_paquete = "SELECT ";
        sql_paquete+="sus.id, ";
        sql_paquete+="sus.producto, ";
        sql_paquete+="sus.pagomensual, ";
        sql_paquete+="sus.periodo, ";
        sql_paquete+="sus.diasentregadiario, ";
        sql_paquete+="sus.estado, ";
        sql_paquete+="sus.id_grupo, ";
        sql_paquete+="cli.nombre ";
        sql_paquete+="FROM suscripcion sus ";
        sql_paquete+="INNER JOIN cliente cli ON cli.id = sus.idcliente ";
        sql_paquete+="WHERE sus.id_grupo="+ nro_grup +" and  cli.nrodni="+nrodoc;

        con.query(sql_paquete, function (err, paquetes, field) {
            if (err) return res.status(500).send({message:'Usted no es suscriptor del CLUB Actualmente '+nrodoc})
            res.status(200).json({
                data:paquetes.rows
            });
            console.log(paquetes.rows);
            //console.log(paquetes.rows[0]['producto']);
            var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrodoc +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '400274', 'CONSULTAS','CONSULTA DE FACTURACION')";
                con.query(sql, function (err, result) {
                if (err) throw err;
                console.log('insercion correcta');
            });

            freshdesk.createTicket({
                name: 'martin',
                email: 'martin@gmail.com',
                subject: 'CONSULTA',
                description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                status: 2,
                priority: 1
            }, function (err, data) {
                console.log(err || data)
            })
        });

        
        return false;
    } else if (tipo_doc == 3) {

        var sql_paquete = "SELECT ";
        sql_paquete+="sus.id, ";
        sql_paquete+="sus.producto, ";
        sql_paquete+="sus.pagomensual, ";
        sql_paquete+="sus.periodo, ";
        sql_paquete+="sus.diasentregadiario, ";
        sql_paquete+="sus.estado, ";
        sql_paquete+="sus.id_grupo, ";
        sql_paquete+="cli.nombre ";
        sql_paquete+="FROM suscripcion sus ";
        sql_paquete+="INNER JOIN cliente cli ON cli.id = sus.idcliente ";
        sql_paquete+="WHERE sus.id_grupo="+ nro_grup +" and  cli.nrodni="+nrodoc;

        con.query(sql_paquete, function (err, paquetes, field) {
            if (err) return res.status(500).send({message:'Usted no es suscriptor del CLUB Actualmente '+nrodoc})
            res.status(200).json({
                data:paquetes.rows
            });
            console.log(paquetes.rows);
            //console.log(paquetes.rows[0]['producto']);
            var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + nrodoc +"','Consulta periodo, dias de reparto, direccion','LLAMADAS INFORMATIVAS','0', '400274', 'CONSULTAS','CONSULTA DE FACTURACION')";
                con.query(sql, function (err, result) {
                if (err) throw err;
                console.log('insercion correcta');
            });

            freshdesk.createTicket({
                name: 'martin',
                email: 'martin@gmail.com',
                subject: 'CONSULTA',
                description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
                status: 2,
                priority: 1
            }, function (err, data) {
                console.log(err || data)
            })
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


