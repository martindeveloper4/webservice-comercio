'use strict'
const con = require('../conexion/conexion');


function getListaSuscripciones(req,res){
 
        var nro_document =  req.body.nro_documento;
        var subcategory = req.body.subcategoria; 


        var sql_suscripcion = "SELECT ";
        sql_suscripcion+="sus.id_suscripcion, ";
        sql_suscripcion+="sus.producto, ";
        sql_suscripcion+="sus.periodo ";
        sql_suscripcion+="FROM suscripcion sus ";
        sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
        sql_suscripcion+="WHERE sus.id_subcategoria=" +subcategory+ " AND cli.nrodni="+nro_document;
        
        
        con.query(sql_suscripcion, function (err, suscripciones, field) {

            if(suscripciones){

                res.status(200).json({
                    data: suscripciones.rows
                });
        

            }else{
           
                res.status(200).json({
                    message: 'No tiene ninguna suscripcion'
  
                });
            }
        });

    
    

}


module.exports = {
	getListaSuscripciones,
}


