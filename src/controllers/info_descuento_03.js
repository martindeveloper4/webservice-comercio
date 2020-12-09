'use strict'
const con = require('../conexion/conexion');

// Consumo de la API de FRESHDESK con su APIKEY, para generar ticket
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk('https://newaccount1607357966352.freshdesk.com', 'jXAJKBYPAW8cOmqu1gL');


// SERVICIO DE CONSULTA INFORMATIVA GENERAL DE PAQUETE DEL SUSCRIPTOR
function getDescuentos(req,res){
	
    let dni = req.body.dni;


	var sql = "INSERT INTO tipificacion_bot (dni,observacion,tipo,estado,nro_delivery,motivo,submotivo) VALUES ('" + dni +"','Consulta de Descuento o Promociones','CLUB DEL SUSCRIPTOR','0', '', 'CONSULTAS','TIENDA CLUB')";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

	freshdesk.createTicket({
        name: 'Martin',
        email: 'Martin@gmail.com',
        subject: 'CONSULTA',
        description: 'CONSULTA INFORMATIVA GENERAL DE PAQUETE',
        status: 2,
        priority: 1
    }, function (err, data) {
        console.log(err || data)
    })


    res.json({
        message: 'Accede a los descuentos link: club.elcomercio.com.pe'
    });

}


module.exports = {
	getDescuentos,
}