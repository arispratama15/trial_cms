// routes/router.js

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This username is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, nama, username, password, registered, isAdmin) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.nama
              )}, ${db.escape(req.body.username)}, ${db.escape(
                hash
              )}, now(), ${db.escape(req.body.isAdmin)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "nub sia",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].user,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

router.get("/orang-test", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("Haloo, berhasil login");
});

router.get("/user/list", userMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `SELECT id, nama, username, isAdmin FROM users`,
    (err, result) => {
      return res.status(200).send({
        user: result,
      });
    }
  );
});

module.exports = router;
