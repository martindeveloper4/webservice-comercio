'use strict'
//PARA PODER USAR LAS FUNCIONALIDADES DE ECMASCRIPT6

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = process.env.PORT || 4000;

//setting
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


//middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


const paqueteCtrl = require('./src/controllers/info_paquete_04');
const descuentoCtrl = require('./src/controllers/info_descuento_03');



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



/* RUTAS DE ACCESO A LOS SERVICIOS */
app.post('/api/paquetes',paqueteCtrl.getPaquetes);
app.get('/api/descuentos',descuentoCtrl.getDescuentos);



app.listen(port,()=>{
    console.log(`Api rest corriendo en http://localhost:${port}`);
});;