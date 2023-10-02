const express = require ('express');
const {signup, forgotPassword} = require ('../controllers/user');
const router = express.Router ();

router.post ('/signup', signup);
router.post ('/password/forgot-password', forgotPassword);
module.exports = router;
