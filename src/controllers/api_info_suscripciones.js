'use strict';
const con = require('../conexion/conexion');


function getListaSuscripciones(req,res){


        console.log(req.body);
        let nro_document =  req.body.nro_documento;
        let nro_doc = parseInt(nro_document);
        console.log(nro_document);
        //console.log(typeof nro_document);
        //console.log(nro_document);


        let id_subcategoria = req.body.subcategoria;
        let id_subcategory = parseInt(id_subcategoria);
        console.log(id_subcategory);
        //console.log(typeof id_subcategoria);
        //console.log(id_subcategoria);
        

        
        if (nro_document.length == 8) {

            var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategory+ " AND cli.nrodni="+nro_doc;
            
            
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
    
    } else if (nro_document.length == 9) {

            var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategory+ " AND cli.nrocarnetextranjeria="+nro_doc;
            
            
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
                        message: 'Tiene suscripcion',
                        code: '0'
                    });
            
                }
            });


    } else if (nro_document.length == 11) {

        var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategory+ " AND cli.nroruc="+nro_doc;

            
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


