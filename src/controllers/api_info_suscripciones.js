'use strict'
const con = require('../conexion/conexion');


function getListaSuscripciones(req,res){
        var nro_document =  req.body.nro_documento;
        console.log(nro_document);
        var id_subcategoria = req.body.subcategoria;
        console.log(id_subcategoria);
        var id_subcategoria_one =  Number(id_subcategoria);
        console.log(id_subcategoria_one);

        
        if (nro_document.length == 8) {

            var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria_one+ " AND cli.nrodni="+nro_document;
            
            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount == 1){
                    res.status(200).json({
                        data: suscripciones,
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

            return false;
    
    } else if (nro_document.length == 9) {

        var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria_one+ " AND cli.nrocarnetextranjeria="+nro_document;
            
            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount == 1){
                    res.status(200).json({
                        data: suscripciones,
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

            return false;

    } else if (nro_document.length == 11) {

        var sql_suscripcion = "SELECT ";
            sql_suscripcion+="sus.id_suscripcion, ";
            sql_suscripcion+="sus.producto, ";
            sql_suscripcion+="sus.periodo ";
            sql_suscripcion+="FROM suscripcion sus ";
            sql_suscripcion+="INNER JOIN cliente cli ON cli.id_cliente = sus.id_cliente ";
            sql_suscripcion+="WHERE sus.id_subcategoria=" +id_subcategoria_one+ " AND cli.nroruc="+nro_document;
            
            
            con.query(sql_suscripcion, function (err, suscripciones, field) {
                console.log(suscripciones.rows);
                if(suscripciones.rowCount == 1){
                    res.status(200).json({
                        data: suscripciones,
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

            return false;

    } else {
        res.status(200).json({
            data: 'El numero de documento identificado no es correcto'
        });
    }




        

    
    

}


module.exports = {
	getListaSuscripciones,
}


