const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");

async function login(query) {
  const result = await db.query(
    `SELECT user FROM user WHERE user = ? AND password = ?`,
    [query.user, query.password]
  );
  
  let message = "Login successful";
  return { message };
}

module.exports = {
  login,
};
