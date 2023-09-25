const express = require ('express');
const {login} = require ('../controllers/login');
const jwt = require ('jsonwebtoken');
const router = express.Router ();
const generateToken = (req, res, next) => {};
router.post ('/login', generateToken, login);
module.exports = router;
