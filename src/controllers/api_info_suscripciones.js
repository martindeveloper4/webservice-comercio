'use strict';
const con = require('../conexion/conexion');


function getListaSuscripciones(req,res){


        console.log(req.body);
        var id_subcategoria = req.body.subcategoria;
        let nro_document =  req.body.nro_documento;


        //let id_subcategory = parseInt(id_subcategoria);
        //console.log(id_subcategory);
        //console.log(typeof id_subcategoria);
        //console.log(id_subcategoria);
        

        
        if (id_subcategoria == 1) {

            var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria+ " AND cli.nrodni="+nro_document;
            
            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount > 0){
                    res.status(200).json({
                        message: 'Tiene suscripcion',
                        code: '1'
                    });
            
                }
                
                
                if(suscripciones.rowCount == 0){
                    res.status(200).json({
                        message: 'No tiene ninguna suscripcion',
                        code: '0'
                    });
            
                }
                
            });
    
    } else if (id_subcategoria == 2) {

            var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria+ " AND cli.nrocarnetextranjeria="+nro_document;
            
            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount == 1){
                    res.status(200).json({
                        message: 'Tiene suscripcion',
                        code: '1'
                    });
            
                }

                if(suscripciones.rowCount == 0){
                    res.status(200).json({
                        message: 'No Tiene suscripcion',
                        code: '0'
                    });
            
                }
            });


    } else if (id_subcategoria == 3) {

        var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria+ " AND cli.nroruc="+nro_document;

            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount == 1){
                    res.status(200).json({
                        message: 'Tiene suscripcion',
                        code: '1'
                    });
            
                }

                if(suscripciones.rowCount == 0){
                    res.status(200).json({
                        message: 'No tiene ninguna suscripcion',
                        code: '0'
                    });
            
                }
            });


    } else {
        res.status(200).json({
            message: 'El numero de documento identificado no es correcto'
        });
    }

    

}


module.exports = {
	getListaSuscripciones,
}


