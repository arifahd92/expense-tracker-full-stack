const express = require ('express');
const {signup} = require ('../controllers/signup');
const {generateToken} = require ('../middleware/generateToken');
const router = express.Router ();

router.post ('/signup', signup);
module.exports = router;
