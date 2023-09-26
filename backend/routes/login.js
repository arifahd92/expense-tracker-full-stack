const express = require ('express');
const {login, generateToken} = require ('../controllers/login');
const router = express.Router ();

router.post ('/login', generateToken, login);
module.exports = router;
