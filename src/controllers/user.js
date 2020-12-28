const con = require("../conexion/conexion");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const registerUser = (req, res) => {
  let username = req.body.username || req.query.username;
  let correo = req.body.correo || req.query.correo;
  let password = req.body.password || req.query.password;
  let repeatPassword = req.body.repeatPassword || req.query.repeatPassword;

  if (password !== repeatPassword) {
    res.status(200).json({
      message: "El password y el password repetido no coinciden",
      code: 0,
    });
  } else {
    let sql = `SELECT *FROM CLIENTE WHERE correo='${correo}'`;
    con.query(sql, function (err, arr, field) {
      try {
        if (arr.rowCount > 0) {
          let uuid = uuidv4();
          let sql = `INSERT INTO usuario(username,correo,password,estado,token) values('${username}','${correo}','${password}',0,'${uuid}')`;
          con.query(sql, function (err, arr, field) {
            try {
              if (err) throw err;
              let sql = `UPDATE cliente SET token='${uuid}' WHERE correo='${correo}'`;
              con.query(sql, function (err, arr, field) {
                try {
                  if (err) throw err;
                  sendEmail(res, uuid, correo);
                } catch (e) {
                  res.status(200).json({
                    message: e.message,
                    code: 0,
                  });
                }
              });
            } catch (e) {
              res.status(200).json({
                message: e.message,
                code: 0,
              });
            }
          });
        } else {
          res.status(200).json({
            message:
              "Su correo no se encuentra en nuestra base de datos de clientes.",
            code: 0,
          });
        }
      } catch (e) {
        res.status(200).json({
          message: e.message,
          code: 0,
        });
      }
    });
  }
};

const loginUser = (req, res) => {
  let username = req.body.username || req.query.username;
  let password = req.body.password || req.query.password;

  let sql = `SELECT 
              c.token token,
              c.nombre || ' ' || c.apellidopaterno || ' ' || c.apellidomaterno as name
            FROM usuario u
            INNER JOIN cliente c ON c.token = u.token 
            WHERE u.username='${username}' AND u.password='${password}' AND u.estado=1`;

  con.query(sql, function (err, arr, field) {
    console.log(arr);
    let user = arr;
    try {
      if (err) throw err;

      if (arr.rowCount > 0) {
        res.status(200).json({
          message: "El usuario existe",
          code: 1,
          token: arr.rows[0].token,
          name: arr.rows[0].name,
        });
      } else {
        res.status(200).json({
          message: "El usuario no existe",
          code: 0,
        });
      }
    } catch (e) {
      res.status(200).json({
        message: e.message,
        code: 0,
      });
    }
  });
};

const validateUserAccout = (req, res) => {
  let token = req.body.token || req.query.token || req.params.token;

  let sql = `SELECT *FROM usuario WHERE token='${token}'`;

  con.query(sql, function (err, arr, field) {
    try {
      if (err) throw err;

      if (arr.rowCount > 0) {
        let sql = `UPDATE usuario SET estado=1 WHERE token='${token}'`;
        con.query(sql, function (err, arr, field) {
          try {
            if (err) throw err;
            res.sendFile(path.join(__dirname, "../views/index.html"));
          } catch (e) {
            res.status(200).json({
              message: e.message,
              code: 0,
            });
          }
        });
      } else {
        res.status(200).send("TOKEN INVALIDO");
      }
    } catch (e) {
      res.status(200).json({
        message: e.message,
        code: 0,
      });
    }
  });
};

const sendEmail = (res, uuid, correo) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const contentHTML = `<h3>Hola</h3>
												Acceda al siguiente link para activar su cuenta, <a href='https://backendapicomercio.herokuapp.com/usuario/validar?token=${uuid}'>Aquí</a>`;

  const mailOptions = {
    from: '"Club El Comercio " <clubelmercio@comercio.com>',
    to: correo,
    subject: "ACTIVACIÓN CUENTA LANDING EL COMERCIO",
    html: contentHTML,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    try {
      if (err) throw err;
      res.status(200).send({ message: "Se registró correctamente", code: 1 });
    } catch (e) {
      res.status(500).send({ message: e.message, code: 0 });
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  validateUserAccout,
};
