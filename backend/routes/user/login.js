const express = require('express');
const router = express.Router();
const login = require('../../services/user/login');

// Send a POST request to Login a user
/* POST programming language */
router.post('/auth/user', async function (req, res, next) {
    try {
        res.json(await login.login(req.body));
    } catch (err) {
        console.error(`Failed login`, err.message);
        next(err);
    }
    console.log(req.body);
});


module.exports = router;