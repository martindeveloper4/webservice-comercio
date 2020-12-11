'use strict'
const con = require('../conexion/conexion');


function getListaSuscripciones(req,res){
 
    var nro_documento =  req.body.nro_documento;
    var id_subcategoria = req.body.subcategoria; 


        var sql_suscripcion = "SELECT ";
        sql_suscripcion+="sus.id_suscripcion, ";
        sql_suscripcion+="sus.producto, ";
        sql_suscripcion+="sus.periodo ";
        sql_suscripcion+="FROM suscripcion sus ";
        sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
        sql_suscripcion+="WHERE sus.id_subcategoria="+ id_subcategoria +" AND cli.nrodni="+nro_documento;
        
        

        con.query(sql_suscripcion, function (err, suscripciones, field) {
            console.log(suscripciones.rowCount);
            if(suscripciones.rowCount == 0 ){
                res.status(200).json({
                    message: 'No tiene ninguna suscripcion'
  
                });
                

            }
            if(suscripciones.rowCount == 1 ){
                res.status(200).json({
                    id_suscripcion: suscripciones.rows[0]['id_suscripcion'],
                    producto: suscripciones.rows[0]['producto'],
                    periodo: suscripciones.rows[0]['periodo']
                });
            }
        })

    
    

}


module.exports = {
	getListaSuscripciones,
}


