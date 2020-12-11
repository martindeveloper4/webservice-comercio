"use strict";
//PARA PODER USAR LAS FUNCIONALIDADES DE ECMASCRIPT6

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

//setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validacionSuscriptorCtrl = require("./src/controllers/api_validacion_suscriptor");
const listaSuscripcionesCtrl = require("./src/controllers/api_info_suscripciones");
const paquetesCtrl = require("./src/controllers/api_info_paquete");
const descuentoCtrl = require("./src/controllers/api_info_descuento");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/* RUTAS DE ACCESO A LOS SERVICIOS */
app.post(
  "/api/validarsuscriptor",
  validacionSuscriptorCtrl.getValidacionSuscriptor
);
app.post(
  "/api/lista-suscripciones",
  listaSuscripcionesCtrl.getListaSuscripciones
);
app.post("/api/info-paquetes", paquetesCtrl.getPaquetes);
app.post("/api/info-descuentos", descuentoCtrl.getDescuento);

app.get(
  "/api/validarsuscriptor",
  validacionSuscriptorCtrl.getValidacionSuscriptor
);
app.get(
  "/api/lista-suscripciones",
  listaSuscripcionesCtrl.getListaSuscripciones
);
app.get("/api/info-paquetes", paquetesCtrl.getPaquetes);
app.get("/api/info-descuentos", descuentoCtrl.getDescuento);

app.listen(port, () => {
  console.log(`Api rest corriendo en http://localhost:${port}`);
});
