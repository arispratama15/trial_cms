const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

router.get("/content", (req, res, next) => {
  db.query(`SELECT id, content, author FROM users`, (err, result) => {
    return res.status(200).send({
      data: result,
    });
  });
});

router.delete("/content/list/:id", (req, res, next) => {
  db.query(
    `DELETE FROM contents WHERE id=${db.escape(req.params.id)}`,
    (err, result) => {
      return res.status(200).send({
        data: result,
      });
    }
  );
});

router.post("/content/list/:id", (req, res, next) => {
  db.query(
    `UPDATE contents SET content=${db.escape(req.body.content)} WHERE id=${db.escape(
      req.params.id
    )}`,
    (err, result) => {
      return res.status(200).send({
        data: result,
      });
    }
  );
});

router.put("/content/new", (req, res, next) => {
  db.query(
    `INSERT INTO contents (id, content, author) VALUES ('${uuid.v4()}', ${db.escape(
      req.body.content
    )}, ${db.escape(req.body.author)})`,
    (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        return res.status(201).send({
          msg: "Added!",
        });
      }
  );
});

module.exports = contents;
